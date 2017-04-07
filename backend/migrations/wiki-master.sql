CREATE TABLE public.page
(
	pageid			serial						PRIMARY KEY							,
	title			text															NOT NULL,
	description		text															,
	pagetypeid		integer						REFERENCES pagetype (pagetypeid)	NOT NULL,
	createdby		integer															NOT NULL,
	createdon		timestamp with time zone	DEFAULT now()						NOT NULL,
	lasteditedby	integer															,
	lasteditedon	timestamp with time zone										,
	deleted			boolean															,
	deletedby		integer															,
	deletedon		timestamp with time zone
);

CREATE TABLE public.pageorder
(
    pageorderid 	serial		PRIMARY KEY					,
    pageid			integer		REFERENCES page (pageid)	NOT NULL,
    parentpageid	integer									NOT NULL,
	UNIQUE(pageid, parentpageid)
);

CREATE TABLE public.pagetype
(
    pagetypeid		serial		PRIMARY KEY		,
    type			varchar		UNIQUE			NOT NULL,
    displayname		varchar						,
    description		varchar						
);

INSERT INTO pagetype (type, displayname, description)
VALUES ('HTML','HTML','HTML');
INSERT INTO pagetype (type, displayname, description)
VALUES ('perl','Perl','Perl');
INSERT INTO pagetype (type, displayname)
VALUES ('py','Python');
INSERT INTO pagetype (type, displayname)
VALUES ('text','Plain text');

CREATE TABLE public.pagestatic
(
	pagestaticid	serial 		PRIMARY KEY					,
	pageid			integer		REFERENCES page (pageid)	NOT NULL,
	content			text
);

CREATE TABLE public.pagedynamic
(
	pagedynamicid	serial		PRIMARY KEY					,
	pageid			integer		REFERENCES page (pageid)	NOT NULL,
	content			text				
);

CREATE TABLE public.document
(
	documentid		serial		PRIMARY KEY					,
	documentname	text									NOT NULL,
	fileextension	CHAR(5)									,
	pageid			integer		REFERENCES page (pageid)	NOT NULL,
	bytes 			bytea									NOT NULL,
	UNIQUE(pageid, documentname, fileextension)
);

CREATE Table public.user
(
	userid			serial		PRIMARY KEY		NOT NULL,
	firstname		char(25)					,
	lastname		char(25)					,
	login			char(50)	UNIQUE
);

CREATE TABLE public.role
(
	roleid			serial		PRIMARY KEY		NOT NULL,
	rolename		char(100)	UNIQUE			,
	description		text
);

CREATE TABLE public.userrole
(
	userroleid		serial		PRIMARY KEY						NOT NULL,
	userid			integer		REFERENCES public.user (userid)	NOT NULL,
	roleid			integer		REFERENCES role (roleid)		NOT NULL,
	UNIQUE(userid, roleid)
);

--Functions
CREATE OR REPLACE FUNCTION get_pagetypefromid(typeid integer) RETURNS varchar AS $$
	SELECT type FROM pagetype pt WHERE pt.pagetypeid = typeid;
$$ LANGUAGE sql;

--Procedures
CREATE OR REPLACE FUNCTION cud_page(_pageid integer, _pagename varchar, _description varchar, _pagetype varchar, _code varchar, _parentid integer) RETURNS boolean AS $$
DECLARE currentpagetypeid integer;
DECLARE newpageid integer;
DECLARE currentpagetype varchar;
BEGIN
	SELECT pt.pagetypeid INTO currentpagetypeid target FROM pagetype pt WHERE pt.displayname = _pagetype;
	currentpagetype := get_pagetypefromid(currentpagetypeid);
	
	IF _pageid = null or _pageid = 0 THEN
		INSERT INTO page (title, description, pagetypeid, createdby)
		VALUES (_pagename, _description, currentpagetypeid, 1) RETURNING page.pageid INTO newpageid;

		IF currentpagetype = 'HTML' or currentpagetype = 'text' THEN
			INSERT INTO pagestatic (pageid, content)
			VALUES (newpageid, _code);
		ELSIF currentpagetype = 'py' or currentpagetype = 'perl' THEN
			INSERT INTO pagedynamic (pageid, content)
			VALUES (newpageid, _code);
		ELSE
			RETURN FALSE;
		END IF;
		
		IF _parentid <> null or _parentid > 0 THEN
			INSERT INTO pageorder (pageid, parentpageid)
			VALUES (newpageid, _parentid);
		END IF;
	ELSIF _pageid > 0 THEN
		UPDATE page SET title = _pagename, description = _description, pagetypeid = currentpagetypeid, lasteditedby = 1, lasteditedon = current_date
		WHERE pageid = _pageid;
		
		IF currentpagetype = 'HTML' or currentpagetype = 'text' THEN
			UPDATE pagestatic SET content = _code
			WHERE pagestatic.pageid = _pageid;
			
			--Delete if oldpage content if the user updates page type
			IF EXISTS (SELECT 1 FROM pagedynamic pd WHERE pd.pageid = _pageid) THEN
				DELETE FROM pagedynamic WHERE pageid = _pageid;
			END IF;
			
		ELSIF currentpagetype = 'py' or currentpagetype = 'perl' THEN
			UPDATE pagedynamic SET content = _code
			WHERE pageid = _pageid;
			
			IF EXISTS (SELECT 1 FROM pagestatic ps WHERE ps.pageid = _pageid) THEN
				DELETE FROM pagestatic WHERE pageid = _pageid;
			END IF;
		ELSE
			RETURN FALSE;
		END IF;
		
		--Update parent if there is a change
		IF _parentid <> null or _parentid > 0 THEN
			IF EXISTS (SELECT 1 FROM pageorder WHERE pageid = _pageid and parentpageid <> _parentid) THEN
				UPDATE pageorder SET parentpageid = _parentid WHERE pageid = _pageid;
			END IF;
		ELSIF _parentid is null THEN
			IF EXISTS (SELECT 1 FROM pageorder WHERE pageid = _pageid) THEN
				DELETE FROM pageorder WHERE pageid = _pageid;
			END IF;
		END IF;
	END IF;
	
	RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
