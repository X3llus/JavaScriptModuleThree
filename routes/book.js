// requirements
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const db = require("./database");

// POST request to book/avail
router.post("/avail", (req, res) => {
  getAvail(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR");
    })
})

// POST request to book
router.post("/", (req, res) => {
  book(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR")
    })
});

// function to book property, redirects to / when done
async function book(req, res) {
  var pool = db.pool;

  var insert = "INSERT INTO availability (userId, propertyId, dates) values (?, ?, ?)";

  var query = await mysql.format(insert, [req.session.userId, req.body.propertyId, req.body.dates])

  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err);
      res.end("FATAL ERROR");
    } else {
      res.redirect("/");
    }
  });
}

// function to get the availability of a property, returns a JSON file
async function getAvail(req, res) {
  var pool = db.pool;

  var select = "select * from availability where propertyId = ?";

  console.log(req.body);
  var query = await mysql.format(select, [req.body.id])

  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err);
      res.end("FATAL ERROR");
    } else {
      console.log(response);
      res.json(response);
    }
  });
}

module.exports = router;
