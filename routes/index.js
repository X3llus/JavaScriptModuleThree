var express = require("express");
var router = express.Router();
var path = require("path");

router.get('/', function(req, res){
   res.sendFile(path.resolve(__dirname + "/../html/index.html"));
});

//export this router to use in our index.js
module.exports = router;
