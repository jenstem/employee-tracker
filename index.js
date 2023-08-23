// Packages
const inquirer = require('inquirer');
const db = require('./db/connection');

// Function to get started
function startQuery() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Please select one of the following options:',
            name: 'options',
            choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },
    ])


    .then ((answers) => {
        switch (answers.options) {
            case 'View all departments':
                viewAllDepartments();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'View all employees':
                viewAllEmployees();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update an employee role':
                updateRole();
                break;
        }
    })
};

function viewAllDepartments() {
    db.promise().query('SELECT department.name, department.id FROM department')
    .then (function([rows]) {
        let departments = rows;
        console.table(departments);
        startQuery();
    })
}

function viewAllRoles() {
    db.promise().query('SELECT role.title, role.id, department_id, role.salary FROM role INNER JOIN department ON role.department_id = department_id')
    .then (function([rowsRole]) {
        let roles = rowsRole;
        console.table(roles);
        startQuery();
    })
}

function viewAllEmployees() {
    db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, department_id, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id')
    .then (function([rowsEmployee]) {
        let employeesEl = rowsEmployee;
        console.table(employeesEl);
        startQuery();
    })
}

// Function add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the department.',
            name: 'name'
        }
    ])

    .then ((answers) => {
        db.query('INSERT INTO department (name) VALUES (?)', [answers.name]);
        console.log('Department has been added.');
        startQuery();
    });
};

// Function add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the role.',
            name: 'title'
        },

        {
            type: 'input',
            message: 'Please enter the salary.',
            name: 'salary'
        },

        {
            type: 'input',
            message: 'Please enter ID of the department.',
            name: 'department_id'
        }
    ])

    .then ((answers) => {
        // db.query('INSERT INTO role (title, salary, department_id) VALUES (answers.title, answers.salary, answers.department_id)', [answers.title, answers.salary, answers.department_id]);
        db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, answers.department_id]);
        console.log('Role has been added.');
        startQuery();
    });
};

// Function add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the first name of the employee.',
            name: 'first_name'
        },

        {
            type: 'input',
            message: 'Please enter the last name of the employee.',
            name: 'last_name'
        },

        {
            type: 'input',
            message: 'Please enter the role of the employee.',
            name: 'role_id'
        },

        {
            type: 'input',
            message: 'Please enter the id for the manager of the employee.',
            name: 'manager_id'
        }
    ])

    .then ((answers) => {
        // db.query('INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (answers.first_name, answers.last_name, answers.role_id, answers.manager_id)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
        db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
        console.log('Employee has been added.');
        startQuery();
    });
};

// Function to update an employee's role
function updateRole() {
    db.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS full_name, employee.id AS employee_id, role.* FROM employee INNER JOIN role ON employee.role_id = role.id',
        function (err, results) {
            if (err) throw err;

            let employeesEl = results.map(employee => ({
                full_name: employee.full_name,
                id: employee.employee_id,
                value: [employee.full_name, employee.employee_id]
            }))
            console.log(employeesEl)
        }

    )
//     .then ((employee) => {
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 message: 'Please select one of the following employees:',
//                 name: 'id',
//                 choices: employee.map((employee) => ({
//                     name: 'employee.first_name AND employee.last_name',
//                     value: employee.id
//                 })),
//             },

//             {
//                 type: 'input',
//                 message: 'Please enter the new role of the employee.',
//                 name: 'role_id'
//             }
//     ])}
// )
//     .then ((answers) => {
//         db.promise().query('UPDATE employee (first_name, last_name, role_id) VALUES (?, ?)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
//         console.log("Employee's role has been updated.");
//         startQuery();
//     }
//     );
};

// Call function to initialize app
startQuery();