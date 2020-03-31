// Requirements
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const uuid = require('uuid/v4');
const auth = require("./auth.json");
const FileStore = require('session-file-store')(session);

// Setting up the express app middleware
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    return uuid()
  },
  store: new FileStore(),
  secret: auth.secret,
  resave: false,
  saveUninitialized: true
}));

// File pathes to routes
const indexRoute = require("./routes/index.js");
const signupRoute = require("./routes/signup.js");
const loginRoute = require("./routes/login.js");
const detailsRoute = require("./routes/details.js");
const propertiesRoute = require("./routes/properties.js");
const hostRoute = require("./routes/host.js");
const loggedInRoute = require("./routes/loggedIn.js");
const infoRoute = require("./routes/info.js");
const profileRoute = require("./routes/profile.js");
const reviewRoute = require("./routes/review.js");
const bookRoute = require("./routes/book.js");
const logoutRoute = require("./routes/logout.js");
const deleteRoute = require("./routes/delete.js");

// Making routes
app.use("/", indexRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/details", detailsRoute);
app.use("/properties", propertiesRoute);
app.use("/host", hostRoute);
app.use("/loggedIn", loggedInRoute);
app.use("/info", infoRoute);
app.use("/profile", profileRoute);
app.use("/review", reviewRoute);
app.use("/book", bookRoute);
app.use("/logout", logoutRoute);
app.use("/delete", deleteRoute);

// Listening for connections
app.listen(8080, () => console.log("listening on port 8080"));
