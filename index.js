const db = require('./db/connect');


function mainMenu(){
    /*
    inquirer.prompt(question).then(answer => {
        if (answer.choice === 'View Employees'){
            viewemployees()
        }else if (answers.choice === 'View Roles'){
            viewRoles()
        }
    })
    */
}
//they seelect view all employees
function viewEmployees(){
    db.promise().query('SELECT * FROM employee').then(data => {
        console.table(data)
        mainMenu()
        })
}


mainMenu()