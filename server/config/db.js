const mysql = require("mysql");

const db = mysql.createConnection({
  host: "camsurveillance.cew21pzbju15.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "cmpe281*",
  port: "3306",
  database: "cam_sur",
});
db.connect(function (err) {
  if (err) {
    console.error("Database connection failed:" + err.stack);
    return;
  }
  console.log("DataBase connected");
});

module.exports = db;
