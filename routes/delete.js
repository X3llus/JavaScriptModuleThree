// requirements
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const db = require("./database");

// get request to delete
router.get("/", (req, res) => {
  deleteProperty(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR");
    })
});

// function to delete a property, deletes if owner if logged in only, redirects to /profile
async function deleteProperty(req, res) {
  var pool = db.pool;

  var select = "DELETE FROM properties WHERE id = ? AND ownerId = ?";

  var query = await mysql.format(select, [req.query.property, req.session.userId]);

  pool.query(query, (err, properties) => {
    if (err) {
      res.end("FATAL ERROR");
      console.log(err);
    } else {
      res.redirect("/profile");
    }
  });
}

module.exports = router;
