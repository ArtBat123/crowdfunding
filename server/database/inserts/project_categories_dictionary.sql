insert into
    project_categories_dictionary (id, "name", description)
values
    (1, 'Технологии', null),
    (2, 'Творчество', null),
    (3, 'События', null),
    (4, 'Еда', null),
    (5, 'Экология и природа', null),
    (6, 'Бизнес', null),
    (7, 'Игры', null),
    (8, 'Обучение', null),
    (9, 'Наука', null)
on conflict (id) do update set
    "name" = excluded.name,
    "description" = excluded.description;