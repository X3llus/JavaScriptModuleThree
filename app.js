//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// Security stuff
const bcrypt = require('bcrypt');
const saltRounds = 12;
// const auth = require('./auth.json');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// Code to listen for requests using Express Framework
const express = require('express');
const index = require('./routes/index.js');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/', index);

app.listen(8080, () => console.log("listening on port 8080"));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// MySQL connection
// const mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit: 100,
//   host: "localhost",
//   user: auth.username,
//   password: auth.password
// });
