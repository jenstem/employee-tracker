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
    })
}

function viewAllRoles() {
    db.query('SELECT role.title, role.id, department_id, role.salary');
}

function viewAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, department_id, role.salary', 'employee.manager_id');
}

// Function add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the department.',
            name: 'departments'
        }
    ])

    .then ((answers) => {
        db.query('INSERT INTO department (departments) VALUES (?)');
        [answers.departments],
        console.log('Department has been added.');
    });
};

// Function add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the role.',
            name: 'nameOfRole'
        },

        {
            type: 'input',
            message: 'Please enter the salary.',
            name: 'amountOfSalary'
        },

        {
            type: 'input',
            message: 'Please enter ID of the department.',
            name: 'department_id'
        }
    ])

    .then ((answers) => {
        db.query('INSERT INTO role (nameofRole, amountOfSalary, department_id) VALUES (answers.title, answers.salary, answers.department_id)');
        [answers.title, answers.salary, answers.department_id],
        console.log('Role has been added.');
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
        db.query('INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (answers.first_name, answers.last_name, answers.role_id, answers.manager_id)');
        [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
        console.log('Employee has been added.');
    });
};

// Function to update an employee's role
function updateRole() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select one of the following employees:',
                name: 'employeesAll',
                // Not sure what to put in choices?
                choices: [employee.id]
            },

            {
                type: 'input',
                message: 'Please enter the new role of the employee.',
                name: 'newRole'
            }
        ])
    .then ((answers) => {
        // Unsure about this:
        db.query('UPDATE employee (employeesAll, newRole) VALUES (answers.employee.id, answers.role_id)');
        [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
        console.log("Employee's role has been updated.");
    });
};


function init() {
    inquirer.prompt(startQuery).then((answers) => {
        console.log(answers);

    })
}
// Call init to initialize app
startQuery();
// init();