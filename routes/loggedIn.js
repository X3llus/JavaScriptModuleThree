// requirements
var express = require("express");
var router = express.Router();

// GET request to /loggedIn
router.get("/", (req, res) => {
  if (req.session.userId) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
