// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '139327Yl',
  database : 'hello'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  var sql1 = "INSERT INTO customers (name, address) VALUES ('Company', 'Highway 38')";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});