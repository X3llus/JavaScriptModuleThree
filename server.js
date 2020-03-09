//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// Encryption library things
const bcrypt = require('bcrypt');
const saltRounds = 12;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// Code to listen for requests using Express Framework
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(__dirname + '/Frontend', {
  extensions: ['html']
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.listen(8058, () => console.log("listening on port 8058"));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//
// MySQL connection
var auth = require('./auth.json');

const mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: auth.username,
  password: auth.password
});
