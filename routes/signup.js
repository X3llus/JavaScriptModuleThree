// requirements
const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const db = require("./database");
const bcrypt = require("bcrypt");
const salt = 12;
const validator = require("email-validator");

// GET method, serves page
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/signup.html"));
});

// POST method, adds user to database and signs in
router.post("/", (req, res) => {
  addUser(req, res)
    .catch(err => {
      console.error(err);
      res.send("login failed");
    });

});

// function to add a user to database and add their id to the session, redirects to /
async function addUser(req, res) {
  // Get all paramaters from body

  var body = req.body;
  var confirm = true;

  // Validate all given values
  if (!"fName" in body && body.fName == "") {
    confirm = false;
  } else if (!"lName" in body && body.lName == "") {
    confirm = false;
  } else if (!validator.validate(body.email)) {
    confirm = false;
  } else if (!"password" in body && body.password == "") {
    confirm = false;
  } else if (body.password != body.passwordConfirm) {
    confirm = false;
  }

  if (confirm) {

    // Connects to pool
    var pool = db.pool;

    // Checks if email is in use
    var select = "SELECT SUM(email) FROM users WHERE email = ?";
    var query = await mysql.format(select, [body.email]);

    pool.query(query, async (err, rows) => {
      if (rows["SUM(email)"] == null) {
        var fName = body.fName;
        var lName = body.lName;
        var email = body.email;
        var password = body.password;

        // Hashes the password
        var hPass = await bcrypt.hash(password, salt);

        var insert = "INSERT INTO users (fName, lName, email, password) VALUES (?, ?, ?, ?)";
        var query = await mysql.format(insert, [fName, lName, email, hPass]);

        pool.query(query, async (err, result) => {
          if (err) {
            res.end(err);
          } else {

            var select = "SELECT id FROM users WHERE email = ?";
            var query = await mysql.format(select, [email]);

            pool.query(query, async (err, result) => {
              if (err) {
                res.end("FATAL ERROR");
              } else {
                req.session.userId = result[0].id;
                res.redirect("/");
              }
            });
          }
        });
      } else {
        res.end("Email already in use");
      }
    });
  }
}

module.exports = router;
