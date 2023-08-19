INSERT INTO department (id, name)
VALUES (100, 'Accounting'),
       (200, 'Legal'),
       (300, 'Admin'),
       (400, 'HR');

-- why isn't the department's id the same as department_id?
INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'Accountant', 65000, 100),
       (20, 'Attorney', 120000, 200),
       (30, 'Receptionist', 65000, 300),
       (40, 'Manager', 75000, 400);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1001, 'Amanda', 'Nunez', 10, 2010),
       (2001, 'John', 'Martin', 20, 3010),
       (3001, 'Gabrielle', 'Florence', 30, 3010),
       (4001, 'Mara', 'Baldwin', 40, 2010),
       (5001, 'Jonas', 'Wood', 40, 2010),
       (6001, 'Raphael', 'Trujillo', 20, 2010),
       (7001, 'Amira', 'Whitehead', 10, 2010);