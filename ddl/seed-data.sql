DO $$
declare
	id_arctic int;
	id_jungle int;
	id_gorilla int;
	id_bear int;
begin
	INSERT INTO app.pavilions ("name")	VALUES('Arctic');
	INSERT INTO app.pavilions ("name")	VALUES('Jungle');
	select id into id_arctic from app.pavilions where name='Arctic';
	select id into id_jungle from app.pavilions where name='Jungle';
	
	INSERT INTO app.animals("name") VALUES('Gorilla');
	INSERT INTO app.animals("name") VALUES('Polar Bear');
	select id into id_gorilla from app.animals where name='Gorilla';
	select id into id_bear from app.animals where name='Polar Bear';
	
	INSERT INTO app.habitats (id_pavilion, id_animal) VALUES(id_arctic, id_bear);
	INSERT INTO app.habitats (id_pavilion, id_animal) VALUES(id_jungle, id_gorilla);
end $$;
