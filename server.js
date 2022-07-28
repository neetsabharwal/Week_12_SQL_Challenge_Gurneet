//required modules
const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const inquirer = require("inquirer");
const cTable = require("console.table");
//using axios for asynchronous fetch calls
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);

//Get all Departments function
async function printDeps() {
  axios
    .get(`http://localhost:${PORT}/api/departments`)
    .then((res) => res.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (res) {
      // always executed
      console.table(res.data);
      init();
    });
}

//Add a Department function
function addDep(depName) {
  axios
    .post(`http://localhost:${PORT}/api/department`, { "name": depName })
    .then(function (res) {
    //   console.log(res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (res) {
    //   // always executed
      printDeps();
    });
}

//Get all Roles function
async function printRoles() {
  axios
    .get(`http://localhost:${PORT}/api/roles`)
    .then((res) => res.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (res) {
      // always executed
      console.table(res.data);
      init();
    });
}

//Add a Role function
function addRole(roleTitle,roleSalary,depId) {
    axios
      .post(`http://localhost:${PORT}/api/role`, { "title": roleTitle, "salary": roleSalary, "department_id":depId })
      .then(function (res) {
      //   console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function (res) {
      //   // always executed
        printRoles();
      });
  }

//Get all Employees function
async function printEmps() {
  axios
    .get(`http://localhost:${PORT}/api/employees`)
    .then((res) => res.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function (res) {
      // always executed
      console.table(res.data);
      init();
    });
}

//Add an Employee function
function addEmp(empId,fName,lName,rId,mId) {
    axios
      .post(`http://localhost:${PORT}/api/employee`, { "id": empId, "first_name": fName, "last_name":lName, "role_id":rId, "manager_id": mId })
      .then(function (res) {
      //   console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function (res) {
      //   // always executed
        printEmps();
      });
  }

//Initialize app on successful DB connection
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View all Departments",
          "Add a Department",
          "View all Roles",
          "Add a Role",
          "View all Employees",
          "Add an Employee",
          "Do Nothing",
        ],
      },
    ])
    .then((choice) => {
      if (choice.action == "View all Departments") {
        printDeps();
      } else if (choice.action == "Add a Department") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Name of the Department",
              name: "depName",
            },
          ])
          .then((ans) => addDep(ans.depName));
      } else if (choice.action == "View all Roles") {
        printRoles();
      } else if (choice.action == "Add a Role") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Title of the Role",
              name: "roleTitle",
            },
            {
                type: "input",
                message: "Salary of the Role",
                name: "roleSalary",
            },
            {
                type: "input",
                message: "Department ID",
                name: "depId",
            },
          ])
          .then((ans) => addRole(ans.roleTitle,ans.roleSalary,ans.depId));
      } else if (choice.action == "View all Employees") {
        printEmps();
      } else if (choice.action == "Add an Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Employee ID",
              name: "empId",
            },
            {
                type: "input",
                message: "Fisrt Name",
                name: "firstName",
            },
            {
                type: "input",
                message: "Last Name",
                name: "lastName",
            },
            {
                type: "input",
                message: "Role ID",
                name: "roleId",
            },
            {
                type: "input",
                message: "Manager ID",
                name: "managerId",
            },
          ])
          .then((ans) => addEmp(ans.empId,ans.firstName,ans.lastName,ans.roleId,ans.managerId));
      } else if (choice.action == "Do Nothing") {
        process.exit("Bye!");
      }
    });
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  app.listen(PORT, () => {
    //start listening on port and initialize app
    console.log(`
     -------------------------------
    |           Employee            |
    |           Manager             |
     -------------------------------
    `)
    init();
  });
});
