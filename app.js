// All express requirements
const express = require("express");
const bodyParser = require("body-parser")
const session = require("express-session");

// All routes
const indexRoute = require("./routes/index.js");
const signupRoute = require("./routes/signup.js");
const loginRoute = require("./routes/signup.js")

// Setting up the express app
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Making routes
app.use("/", indexRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

// Listening for connections
app.listen(8080, () => console.log("listening on port 8080"));
