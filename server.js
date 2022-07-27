//required modules
const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const inquirer = require("inquirer");
const cTable = require("console.table");

const app = express();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);

//Get all Departments
async function printDeps() {
  fetch(`http://localhost:${PORT}/api/departments`)
    .then((res) => res.json())
    .then((res) => console.table(res))
    .catch(function () {
      console.log("Error!");
    });
}

//Initialize app on successful DB connection
function init(){
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "action",
          choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
          ],
        },
      ])
      .then((choice) => {
        if (choice.action == "View all Departments") {
          printDeps();
        } else if (choice.action == "View all Roles") {

        } else if (choice.action == "View all Employees") {

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
    init();
  });
});
