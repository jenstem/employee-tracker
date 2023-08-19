INSERT INTO department (name)
VALUES ('Accounting'),
       ('Legal'),
       ('Admin'),
       ('HR');

-- why isn't the department's id the same as department_id?
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 65000, 1),
       ('Attorney', 120000, 2),
       ('Receptionist', 65000, 3),
       ('Manager', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Amanda', 'Nunez', 4, NULL),
       ('John', 'Martin', 2, 1),
       ('Gabrielle', 'Florence', 3, 1),
       ('Mara', 'Baldwin', 4, NULL),
       ('Jonas', 'Wood', 1, 4),
       ('Raphael', 'Trujillo', 2, 4),
       ('Amira', 'Whitehead', 3, 4);