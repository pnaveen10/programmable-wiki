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