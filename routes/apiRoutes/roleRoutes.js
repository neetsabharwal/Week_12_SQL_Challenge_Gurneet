//Require all modules
const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

//Get all Roles
router.get("/roles", (req, res) => {
  const sql = `SELECT * FROM roles`;
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

//Add a role
router.post("/role", ({ body }, res) => {
    //Validate role doesn't already exist
    db.query(
      `select * from roles where title = ? AND department_id = ?`,
      [body.title,body.department_id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (result.length != 0) {
          //Duplicate Department Entry
          res.status(500).json({ error: "Role already exists in this Department." });
        } else {
          //Add department since entry not duplicate
          const sql = "INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)";
          const params = [body.title,body.salary,body.department_id];

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
