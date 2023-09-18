const db = require("./db/connect");
const inquirer = require("inquirer");
db.query = util.promisify(db.query);

function mainMenu() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "mainMenu",
				message: "What would you like to to do?",
				choices: [
					"View All Departments",
					"View All Roles",
					"View All Employees",
					"Add a Department",
					"Add a Role",
					"Add an Employee",
					"Update an Employee Role",
					"Close",
				],
			},
		])
		.then((answer) => {
			switch (answer.choice) {
				case "View All Departments":
					viewDepts();
					break;
				case "View All Roles":
					viewRoles();
					break;
				case "View All Employees":
					viewEmployees();
				case "Add a Department":
					addDept();
					break;
				case "Add a Role":
					addRole();
					break;
				case "Add an Employee":
					addEmployee();
					break;
				case "Update an Employee Role":
					updateRole();
					break;
				case "Close":
					db.close();
			}
		});
};

function viewDepts() {
	db.promisify()
		.query("SELECT * FROM employees")
		.then((data) => {
			console.table(data);
			mainMenu();
		});
};

function viewRoles() {
	db.promisify().query(
		"SELECT * FROM roles".then((data) => {
			console.table(data);
			mainMenu();
		})
	);
};

function viewEmployees() {
	db.promisify()
		.query("SELECT * FROM employees")
		.then((data) => {
			console.table(data);
			mainMenu();
		});
};

async function addDept(){};



mainMenu();
