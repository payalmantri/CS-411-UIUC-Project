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

const cors = require('cors');

connection.connect;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));
app.use(cors({
    origin: '*'
}));
/* GET home page, respond by rendering index.ejs */

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
});

app.get('/', function(req, res) {
        res.send({'message': 'Hello'});
});

/* GET username/password body */
app.post('/login', function(req, res) {
	var username = req.body.email;
	var password = req.body.password;
	var sql = `select id from users where username ='${username}' and password = '${password}'`;
	
	connection.query(sql, function(err, result) {
    		if (err) {
      			res.send(err)
      			return;
    		}
		if (result.length == 1) {
			res.json({isAuthenticated:true,userId:id})
		} else {
			res.json({isAuthenticated:false,userId:null})
		}
 	});
});

/* GET player using id */
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

app.get('/lifetimestats/:id', function(req, res) {
	var tournamentname = req.params.id;

	var sql = `SELECT player_id,
		       name,
		       sum(goals) AS goals,
		       sum(assists) AS assists,
		       sum(yellow_cards) AS yellow_cards,
		       sum(red_cards) AS red_cards,
		       sum(goals) + sum(assists) AS total_points
		FROM game_player_stats
		INNER JOIN player ON player.id = game_player_stats.player_id
		WHERE game_id in
		    (SELECT id
		     FROM Games
		     WHERE tournament_id = (SELECT id FROM tournament WHERE name = '${tournamentname}'))
		GROUP BY player_id
		ORDER BY total_points DESC
		LIMIT 15`;
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
