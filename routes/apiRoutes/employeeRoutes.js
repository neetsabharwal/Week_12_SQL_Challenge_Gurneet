const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;
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

router.post("/employee", ({ body }, res) => {
    //Validate role doesn't already exist
    db.query(
      `select * from roles where id = ?`,
      [body.id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (result.length != 0) {
          //Duplicate Department Entry
          res.status(500).json({ error: "Employee already exists." });
        } else {
          //Add department since entry not duplicate
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

module.exports = router;
