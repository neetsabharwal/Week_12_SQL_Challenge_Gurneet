const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/departments", (req, res) => {
  const sql = `SELECT * FROM departments`;
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

router.post("/department", ({ body }, res) => {
  //Validate department doesn't already exist
  db.query(
    `select * from departments where name = ?`,
    body.name,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (result.length != 0) {
        //Duplicate Department Entry
        res.status(500).json({ error: "Department already exists." });
      } else {
        //Add department since entry not duplicate
        const sql = "INSERT INTO departments (name) VALUES (?)";
        const params = body.name;

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
