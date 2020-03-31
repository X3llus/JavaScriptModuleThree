// requirements
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const db = require("./database");

// GET request to /properties
router.get("/", (req, res) => {
  getAllProperties(req, res)
    .catch(err => {
      res.send("FATAL ERROR");
    })
});

// function to get all properties, returns a JSON file
async function getAllProperties (req, res) {
  var pool = db.pool;

  var select = "SELECT p.id, p.ownerId, p.title, p.price, p.address, p.bedrooms, p.bathrooms, p.image, p.ammenities, p.description, p.discount, AVG(r.rating), u.fName, u.lName, u.superhost FROM properties p LEFT JOIN rating r ON p.id = r.propertyId LEFT JOIN users u ON p.ownerId = u.id GROUP BY p.id";

  var query = await mysql.format(select);

  pool.query(select, (err, properties) => {
    if (err) {
      res.end("FATAL ERROR");
    } else {
      console.log(properties);
      res.json(properties)
    }
  });
}

module.exports = router;
