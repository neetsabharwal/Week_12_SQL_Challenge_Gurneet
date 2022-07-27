INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title,salary,department_id)
VALUES 
    ('Sales Lead',100000,1),
    ('Salesperson',80000,1),
    ('Lead Engineer',150000,2),
    ('Software Engineer',120000,2),
    ('Account Manager',160000,3),
    ('Accountant',125000,4),
    ('Legal Team Lead',250000,4),
    ('Lawyer',190000,4);

INSERT INTO employees (id,first_name,last_name,role_id,manager_id)
VALUES 
    (1,'John','Doe',1,NULL),
    (2,'Mike','Chan',2,1),
    (3,'Ashley','Rodriguez',3,NULL),
    (4,'Kevin','Tupik',4,3),
    (5,'Kunal','Singh',5,NULL),
    (6,'Malia','Brown',6,5),
    (7,'Sarah','Lourd',7,NULL),
    (8,'Tom','Allen',8,7);