// requirements
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const db = require("./database");

// POST request to /review
router.post("/" , (req, res) => {
  addReview(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR");
    })
});

// function to add a review into the database, redirects to the properties detail page when done
async function addReview(req, res) {
  var pool = db.pool;

  var insert = "INSERT INTO rating (userId, propertyId, rating, review) values (?, ?, ?, ?)";

  var query = await mysql.format(insert, [req.session.userId, req.body.propertyId, req.body.rating, req.body.review])

  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err);
      res.end("FATAL ERROR");
    } else {
      res.redirect("/details?property=" + req.body.propertyId);
    }
  });
}

module.exports = router;
