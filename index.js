const db = require("./db/connect");
const inquirer = require("inquirer");
const util = require("util");
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
			switch (answer.mainMenu) {
				case "View All Departments":
					viewDepts();
					break;
				case "View All Roles":
					viewRoles();
					break;
				case "View All Employees":
					viewEmployees();
					break;
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
					db.end();
			}
		})
		.catch((error) => {
			console.error("Error in mainMenu:", error);
			process.exit(1);
		});
}

mainMenu();

async function viewDepts() {
	try {
		const depts = await db.query("SELECT * FROM department");
		console.table(depts);
		mainMenu();
	} catch (error) {
		console.error("Error in viewDepts", error);
		mainMenu();
	}
}

async function viewRoles() {
	try {
		const roles = await db.query(
			`SELECT role.id, role.title, role.salary, department.name AS Department Name  
        FROM role
        JOIN department ON role.department_id = department.id`
		);
		console.table(roles);
		mainMenu();
	} catch (error) {
		console.error("Error in viewRoles", error);
		mainMenu();
	}
}

async function viewEmployees() {
	try {
		const employee = await db.query(
			`SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            department.name AS Department Name,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager Name
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            `
		);
		console.table(employee);
		mainMenu();
	} catch (error) {
		console.error("Error in viewEmployees", error);
		mainMenu();
	}
}

async function addDept() {
	try {
		const department = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "Enter the name of the department:",
			},
		]);

		await db.query(`INSERT INTO department (name) VALUES (?)`, [
			department.name,
		]);

		console.log("Department added successfully");
		mainMenu();
	} catch (error) {
		console.error("Error in addDept", error);
		mainMenu();
	}
}

async function addRole() {
	try {
		const departments = await db.query("SELECT * FROM department");

		const role = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "Enter the name of the role:",
			},
			{
				type: "input",
				name: "salary",
				message: "Enter the salary for the role:",
			},
			{
				type: "list",
				name: "department",
				message: "Select the department for the role:",
				choices: departments.map((department) => ({
					name: department.name,
					value: department.id,
				})),
			},
		]);
		await db.query(
			"INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
			[role.name, role.salary, role.department]
		);

		console.log("Role added successfully!");
		mainMenu();
	} catch (error) {
		console.error("Error in addRole", error);
		mainMenu();
	}
}

async function addEmployee() {
	try {const roles = await db.query("SELECT * FROM role");
	const roleOptions = roles.map((role) => ({
		name: role.title,
		value: role.id,
	}));

	const employees = await db.query("SELECT * FROM employee");
	const managerOptions = employees.map((employee) => ({
		name: `${employee.first_name} ${employee.last_name}`,
		value: employee.id,
	}));

	managerOptions.push({ name: "None", value: null });

	const employee = await inquirer.prompt([
		{
			type: "input",
			name: "first_name",
			message: `Enter the employee's first name:`,
		},
		{
			type: "input",
			name: "last_name",
			message: `Enter the employee's last name:`,
		},
		{
			type: "list",
			name: "role_id",
			message: `Select the employee's role:`,
			choices: roleOptions,
		},
		{
			type: "list",
			name: "manager_id",
			message: `Select the employee's manager`,
			choices: managerOptions,
		},
	]);
	await db.query(
		"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
		[
			employee.first_name,
			employee.last_name,
			employee.role_id,
			employee.manager_id,
		]
	);
	console.log("Employee added successfully.");
	mainMenu();} catch (error){
		console.error("Error in addEmployee", error);
		mainMenu();
	}
}

async function updateRole() {
	try {const employees = await db.query("SELECT * FROM employee");
	const employeeOptions = employees.map((employee) => ({
		name: role.title,
		value: role.id,
	}));

	const roles = await db.query("SELECT * FROM role");
	const roleOptions = roles.map((role) => ({
		name: role.title,
		value: role.id,
	}));

	const updateData = await inquirer.prompt([
		{
			type: "list",
			name: "employee_id",
			message: "Select the employee to update:",
			choices: employeeOptions,
		},
		{
			type: "list",
			name: "role_id",
			message: `Select the employee's new role:`,
			choices: roleOptions,
		},
	]);

	await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
		updateData.role_id,
		updateData.employee.id,
	]);
	console.log("Employee role successfully updated.");
	mainMenu();} catch (error) {
		console.error ("Error in updateRole", error);
		mainMenu();
	}
}
