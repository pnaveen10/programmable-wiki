CREATE TABLE public.wiki_master
(
    id integer NOT NULL,
    parentid integer,
    title text,
    description text,
    code text,
    type "char",
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.wiki_master
    OWNER to postgres;


run this after the abouve query:

ALTER TABLE public.wiki_master ADD COLUMN created_at time with time zone;
ALTER TABLE public.wiki_master ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE public.wiki_master ADD COLUMN updated_at time with time zone;