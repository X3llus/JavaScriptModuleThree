// requirements
var express = require("express");
var router = express.Router();
var path = require("path");
const mysql = require("mysql");
const db = require("./database");
const bcrypt = require("bcrypt");
const salt = 12;

// GET request to /login
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/login.html"));
});

// POST request to /login
router.post("/", (req, res) => {
  login(req, res)
    .catch(err => {
      console.error(err);
      res.end("Fatal Error");
    });
});

// Function to check a users password against password with given email in database, redirects to /
async function login(req, res) {
  var body = req.body;

  var pool = db.pool;

  var select = "SELECT email, password from users where email = ?";
  var query = await mysql.format(select, [body.email]);

  pool.query(query, async (err, rows) => {
    console.log(rows[0].password);
    var match = await bcrypt.compare(body.password, rows[0].password);

    if (match) {

      var select = "SELECT id FROM users WHERE email = ?";
      var query = await mysql.format(select, [body.email]);

      pool.query(query, async (err, result) => {
        if (err) {
          res.end("FATAL ERROR");
        } else {
          req.session.userId = result[0].id;
          console.log(req.session);
          res.redirect("/");
        }
      });

    } else {
      res.end("login failed");
    }
  });
}

module.exports = router;
