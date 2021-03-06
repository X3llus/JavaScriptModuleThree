// requirements
var express = require("express");
var router = express.Router();
var path = require("path");

// GET request to /info
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../html/info.html"));
});

module.exports = router;
