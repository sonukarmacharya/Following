const mysql = require("mysql");
const dbcon = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

dbcon.connect((err) => {
  if (err) console.log("h", err);
  else console.log("Connected to db");
});
