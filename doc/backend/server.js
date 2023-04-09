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

/* Validate username and password */
app.post('/login', function(req, res) {
	console.log(req.body);
	var email = req.body.email;
	var password_hash = req.body.password_hash;
	var sql = `select id from user where email ='${email}' and password_hash = '${password_hash}'`;
	console.log(sql);
	connection.query(sql, function(err, result) {
    		console.log(result);
		if (err) {
      			res.send(err)
      			return;
    		}
		if (result.length == 1) {
			res.json({isAuthenticated:true,userId:result[0].id})
		} else {
			res.json({isAuthenticated:false,userId:null})
		}
		console.log(res);
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

app.get('/players', async (req, res) => {
    const { clubName, minMarketValue, maxMarketValue, playerName, position, subposition } = req.query;
    console.log(clubName, minMarketValue, maxMarketValue, playerName, position, subposition)
    let params = [];

    let sql = `
      SELECT  player.id, player.name as playername, player.position, player.sub_position, player.current_market_value, club.name as clubname
      FROM player
      JOIN club ON player.club_id = club.id
      WHERE club.name ${clubName ? '= ?' : 'IS NOT NULL'}
      AND player.current_market_value BETWEEN ${minMarketValue ? '?' : '0'} AND ${maxMarketValue ? '?' : '9999999999'}
      AND player.name ${playerName ? 'LIKE ?' : 'IS NOT NULL'}
      AND player.position ${position ? '= ?' : 'IS NOT NULL'}
      AND player.sub_position ${subposition ? '= ?' : 'IS NOT NULL'}
    `;

    if (clubName) params.push(clubName);
    if (minMarketValue) params.push(minMarketValue);
    if (maxMarketValue) params.push(maxMarketValue);
    if (playerName) params.push(`%${playerName}%`);
    if (position) params.push(position);
    if (subposition) params.push(subposition);

    connection.query(sql ,params,  function(err, result) {
   	console.log(this.sql)
	    if (err) {
          console.error(err);
    res.status(500).json({ message: 'Error fetching players.' });
	    return ;
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

/* Get user team details */
app.get('/teams', function(req, res) {
	console.log(req.query);
	var userid = req.query.userId;
	console.log(userid)
	var sql = `SELECT T.id as teamId, T.name as teamName, T.logo_url, P.name as playerName, P.id as playerId
                   from team T join player_team PT on T.id=PT.team_id join player P on P.id=PT.player_id
                   where T.user_id = ${userid}`;
	console.log(sql);
	connection.query(sql, function(err, result) {
    		console.log(result);
		if (err) {
      			res.send(err)
      			return;
    		}
		res.json(result);
 	});
});

/* add player to team */
app.post('/teams/player', function(req, res) {
	console.log(req.body);
	var userid = req.body.userId;
	var teamid = req.body.teamId;
	var playerid = req.body.playerId;
	var sql = `insert into player_team(player_id, team_id, user_id, date_added) values (${playerid},${teamid},${userid},GETDATE())`;
	console.log(sql);
	connection.query(sql, function(err, result) {
		console.log(result);
		if (err) {
			res.send(err)
			return;
		}
		res.json(result);
	});

});

/* delete player from team */
app.delete('/teams/player', function(req, res) {
        console.log(req.query);
        var userId = req.query.userId;
	var teamId = req.query.teamId;
	var playerId = req.query.playerId;
        var sql = `DELETE from player_team where user_id=userId and team_id=teamId and player_id=playerId`;
        console.log(sql);
        connection.query(sql, function(err, result) {
                console.log(result);
                if (err) {
                        res.send(err)
                        return;
                }
                res.send(result);
        });
});

/* update team name */
app.put('/team/:id', function(req, res) {
        var teamId = req.params.id
        var sql = `UPDATE team set name=newName where id = teamId`;
        console.log(sql);
        connection.query(sql, function(err, result) {
                console.log(result);
                if (err) {
                        res.send(err)
                        return;
                }
                res.send(result);
        });
});

/* user register */
app.post('/register', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var role = req.body.role;
  var sql = `INSERT into user(name, email, password_hash, role, funds_available)
             VALUES ('${name}', '${email}', '${password}', '${role}', 1000000)`;
  if (name && password) {
    console.log(sql);
    connection.query(sql, function(err, result) {
      if (err) {
          if (err.code == 'ER_DUP_ENTRY') {
            res.send({'message' : 'This email address has already been used!'})
          }
          else {
            res.send(err)
          }
        return;
      }
      var ret_string = `User Registration Complete (id:${result.insertId})`;
      res.send({'message' : ret_string});
      //res.json(result)
    });
  }
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
