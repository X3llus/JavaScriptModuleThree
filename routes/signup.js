const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("./database");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/signup.html"));
  console.log(db);
});

router.post("/", (req, res) => {
  res.send("work");
});

module.exports = router;
