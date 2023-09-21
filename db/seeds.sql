INSERT INTO
    department (name, id)
VALUES
    ('Administration', 1),
    ('Sales', 2),
    ('Service', 3),
    ('Finance', 4);

INSERT INTO
    role (id, title, salary, department_id)
VALUES
    (1, 'Chief Administrator', 150000, 1),
    (2, 'Sales Manager', 100000, 2),
    (3, 'Service Manager', 100000, 3),
    (4, 'Finance Manager', 90000, 4);

INSERT INTO
    employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Scott', 'Johnson', 1, null),
    (2, 'Melissa', 'Robertson', 3, 1),
    (3, 'Robert', 'Smith', 2, 1),
    (4, 'Beverly', 'Allen', 4, 1);
    