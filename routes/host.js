// requirements
var express = require("express");
var router = express.Router();
var path = require("path");
const formidableMiddleware = require('express-formidable');
const mysql = require("mysql");
const db = require("./database");

// GET request to /host
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/host.html"))
});

// adding the formidable middleware to my route to save the image from the form
router.use(formidableMiddleware({
  encoding: "utf-8",
  uploadDir: "./public/images",
  multiples: false
}));

// POST request to /host
router.post("/", (req, res) => {
  let toSend = postProperty(req, res)
    .catch(err => {
      res.send(err)
    });
});

// function to insert a property into the database, redirects to /profile
async function postProperty(req, res) {

  var info = req.fields;
  var ownerId = req.session.userId;
  var title= info.title;
  var price = info.price;
  var address = info.address;
  var bedrooms = info.bedrooms;
  var bathrooms = info.bathrooms;
  var image = req.files.image.path.replace("public/images/", "");
  var amenities = info.amenities;
  var description = info.description;
  var discount = info.discount;

  if (discount == "on") {
    discount = "t";
  } else {
    discount = "f";
  }

  var pool = db.pool;

  var insert = "INSERT INTO properties (ownerId, title, price, address, bedrooms, bathrooms, image, ammenities, description, discount) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  var query = await mysql.format(insert, [ownerId, title, price, address, bedrooms, bathrooms, image, amenities, description, discount])

  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err);
      res.end("FATAL ERROR");
    } else {
      res.redirect("/profile");
    }
  })
}

module.exports = router;
