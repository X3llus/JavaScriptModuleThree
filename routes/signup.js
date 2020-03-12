// All requirements
const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const db = require("./database");
const bcrypt = require('bcrypt');
const salt = 12;

// GET method, serves page
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/signup.html"));
  console.log(db);
});

// POST method, adds user to database and signs in
router.post("/", (req, res) => {
  let toSend = addUser(req)
    .then(toSend => {
      res.send(toSend);
    })
    .catch(err => {
      res.send(err)
    });

});

async function addUser(req) {
  // Get all paramaters from body
  var fName    = req.body.fName;
  var lName    = req.body.lName;
  var email    = req.body.email;
  var password = req.body.password;

  // Hashes the password
  var hPass = await bcrypt.hash(password, salt);

  var pool = db.pool;

  var insert = "INSERT INTO users (fName, lName, email, password) VALUES (?, ?, ?, ?)";
  var query = await mysql.format(insert, [fName, lName, email, hPass]);

  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(response);
  });


  return query;

}

module.exports = router;
