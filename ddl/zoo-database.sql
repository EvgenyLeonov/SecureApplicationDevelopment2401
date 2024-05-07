-- app.animals_seq definition

-- DROP SEQUENCE app.animals_seq;

CREATE SEQUENCE app.animals_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
	
-- app.pavilions_seq definition

-- DROP SEQUENCE app.pavilions_seq;

CREATE SEQUENCE app.pavilions_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- app.animals definition

-- Drop table

-- DROP TABLE app.animals;

CREATE TABLE app.animals (
	id int4 DEFAULT nextval('app.animals_seq'::regclass) NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT animals_pk PRIMARY KEY (id)
);

-- app.pavilions definition

-- Drop table

-- DROP TABLE app.pavilions;

CREATE TABLE app.pavilions (
	id int4 DEFAULT nextval('app.pavilions_seq'::regclass) NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT pavilions_pk PRIMARY KEY (id)
);	

-- app.habitats definition

-- Drop table

-- DROP TABLE app.habitats;

CREATE TABLE app.habitats (
	id_pavilion int4 NOT NULL,
	id_animal int4 NOT NULL
);


-- app.habitats foreign keys

ALTER TABLE app.habitats ADD CONSTRAINT habitats_animals_fk FOREIGN KEY (id_animal) REFERENCES app.animals(id);
ALTER TABLE app.habitats ADD CONSTRAINT habitats_pavilions_fk FOREIGN KEY (id_pavilion) REFERENCES app.pavilions(id);