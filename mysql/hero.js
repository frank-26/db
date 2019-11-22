// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
var mysql      = require('mysql');
var hes      = require('./heros.sql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '139327Yl',
  database : 'hero'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "CREATE TABLE heros (name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  // var sql = "INSERT INTO heros (name, address) VALUES ('Company Inc', 'Highway 37')";
  // var sql1 = "INSERT INTO heros (name, address) VALUES ('Company', 'Highway 38')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  con.query(hes, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});