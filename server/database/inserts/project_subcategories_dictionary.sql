insert into
    project_subcategories_dictionary (id, "categoryId", "name", description)
values
    (1, 1, 'Приложения', null),
    (2, 1, 'Роботы', null),
    (3, 1, 'Космос', null),
    (4, 2, 'Музыка', null),
    (5, 2, 'Литература', null),
    (6, 2, 'Театр', null),
    (7, 2, 'Фильмы', null),
    (8, 2, 'Танцы', null)
on conflict (id) do update set
    "categoryId" = excluded."categoryId",
    "name" = excluded.name,
    "description" = excluded.description;