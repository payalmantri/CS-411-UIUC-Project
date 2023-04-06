var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.121.2.8',
                user: 'root',
                password: 'test1234',
                database: 'fantasy_soccer_db'
});

connection.connect;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
});

app.get('/', function(req, res) {
        res.send({'message': 'Hello'});
});

app.get('/players/:id', function(req, res) {
	  var playerid = req.params.id;

  var sql = `select * from player where id ='${playerid}'`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.json(result)
  });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});
