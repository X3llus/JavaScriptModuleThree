// requirements
const express = require("express");
const router = express.Router();

// GET request to /logout, destroys session and redirects to /
router.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
