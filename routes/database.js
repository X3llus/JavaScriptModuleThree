// Database pool connection
const auth = require("../auth.json");
const mysql = require("mysql");
exports.pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: auth.username,
  password: auth.password,
  database: "jsm3"
});
