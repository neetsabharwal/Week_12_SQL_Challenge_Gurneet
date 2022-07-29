//Require all modules
const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

//Print all employees
router.get("/employees", (req, res) => {
  const sql = `SELECT employees.id,employees.first_name,employees.last_name, roles.title as title, roles.salary as salary, departments.name as department_name, m.first_name as manager FROM employees left join roles on employees.role_id = roles.id left join departments on roles.department_id = departments.id left outer join employees as m on employees.manager_id = m.id order by employees.id asc`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//Create an employee
router.post("/employee", ({ body }, res) => {
    //Validate employee doesn't already exist
    db.query(
      `select * from roles where id = ?`,
      [body.id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (result.length != 0) {
          //Duplicate Employee Entry
          res.status(500).json({ error: "Employee already exists." });
        } else {
          //Add Employee since entry not duplicate
          const sql = "INSERT INTO employees (id,first_name,last_name,role_id,manager_id) VALUES (?,?,?,?,?)";
          const params = [body.id,body.first_name,body.last_name,body.role_id,body.manager_id];
          
          db.query(sql, params, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({
              message: "Success",
              data: body,
            });
          });
        }
      }
    );
  });

//Update an employee
router.put("/employee/:id", (req, res) => {
  let body = req.body;
  //Validate employee exists
  db.query(
    `select * from employees where id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (result.length != 0) {
        //Employee exists
        const sql = "UPDATE employees SET manager_id = ? where id = ?";
        const params = [body.manager_id,req.params.id];
        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: "Success",
            data: body,
          });
        });
      } else {
        //Employee does not exist.
        res.status(500).json({ error: "Employee does not exist." });
      }
    }
  );
});

module.exports = router;
