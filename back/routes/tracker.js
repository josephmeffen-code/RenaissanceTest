var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var con = mysql.createConnection({host: "localhost", user: "root", database: "expenses"});

con.connect(function(err) {
  if (err) throw err;
});

router.get('/', function(req, res, next) {  //return all expenses
  con.query("SELECT * FROM expensetable", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
  
});

router.post('/', function(req, res, next) { //add a single expense
  console.log(req.body);
  con.query("INSERT INTO expensetable (Name, Type, Value) VALUES (?, ?, ?)", [req.body.Name, req.body.Type, req.body.Value], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });

});

router.delete('/', function(req, res, next) { //delete one or more expenses
  console.log(typeof req.body[0].ID);
  var command = "DELETE FROM expensetable WHERE ID IN (";
  command = command.concat(req.body[0].ID);
  if (Array.isArray(req.body)){
    req.body.slice(1).forEach(element => {
      command = command.concat(",");
      command = command.concat(element.ID);
    });
  }
  command = command.concat(");");
  console.log(command);
  con.query(command, [req.body.Name, req.body.Type, req.body.Value], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });

});

module.exports = router;
