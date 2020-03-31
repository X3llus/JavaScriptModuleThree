//  requirements
var express = require("express");
var router = express.Router();
var path = require("path");
const mysql = require("mysql");
const db = require("./database");

// GET request to /details
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/details.html"));
});

// POST request to /details
router.post("/", (req, res) => {
  getProperty(req, res)
    .catch(err => {
      console.log(err);
      res.end("FATAL ERROR");
    });
});

// function to get the details of a property, returns a JSON file
async function getProperty(req, res) {

  var body = req.body;

  var pool = db.pool;

  var select = "SELECT p.id, p.ownerId, p.title, p.price, p.address, p.bedrooms, p.bathrooms, p.image, p.ammenities, p.description, p.discount, AVG(r.rating), u.fName, u.lName, u.superhost FROM properties p LEFT JOIN rating r ON p.id = r.propertyId LEFT JOIN users u ON p.ownerId = u.id WHERE p.id = ? GROUP BY p.id";

  var query = await mysql.format(select, [body.id]);

  pool.query(query, (err, properties) => {
    if (err) {
      res.end("FATAL ERROR");
      console.log(err);
    } else {
      console.log(properties);
      res.json(properties)
    }
  });

}

module.exports = router;
