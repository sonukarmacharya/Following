const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./" });

const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "customerfollowup",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL connected");
  }
});

module.exports = db;
