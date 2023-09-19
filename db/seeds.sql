INSERT INTO department (name)

VALUES('Administration', 'Sales', 'Service', 'Finance');


-- INSERT INTO role (title, salary, department_id)
-- VALUES (  )


INSERT INTO employee (
    first_name,
    last_name,
    role_id,
    manager_id,)

VALUES ('Scott', 'Johnson', 3, 2), 
       ('Melissa', 'Robertson', 1, null),
       ('Robert', 'Smith', 4, 3),
       ('Beverly', 'Allen', 1, 1),
       ('John', 'White', 2, 4);
