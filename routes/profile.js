// requirements
var express = require("express");
var router = express.Router();
var path = require("path");
const mysql = require("mysql");
const db = require("./database");

// GET request to /profile
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/profile.html"));
});

// POST request to /profile
router.post("/", (req, res) => {
  getOwnProperties(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR")
    })
});

// Function to get all properties owned by the user
async function getOwnProperties(req, res) {
  var pool = db.pool;

  var select = "SELECT p.id, p.ownerId, p.title, p.price, p.address, p.bedrooms, p.bathrooms, p.image, p.ammenities, p.description, p.discount, AVG(r.rating), u.fName, u.lName, u.superhost FROM properties p LEFT JOIN rating r ON p.id = r.propertyId LEFT JOIN users u ON p.ownerId = u.id WHERE p.ownerId = ? GROUP BY p.id";

  var query = await mysql.format(select, [req.session.userId]);

  pool.query(query, (err, properties) => {
    if (err) {
      console.log(err);
      res.end("FATAL ERROR");
    } else {
      console.log(properties);
      res.json(properties)
    }
  });
}

module.exports = router;
