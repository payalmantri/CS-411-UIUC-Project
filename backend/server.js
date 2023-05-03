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

function format(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/* GET home page, respond by rendering index.ejs */

app.get('/success', function (req, res) {
  res.send({ 'message': 'Attendance marked successfully!' });
});

app.get('/', function (req, res) {
  res.send({ 'message': 'Hello' });
});

/* Validate username and password */
app.post('/login', function (req, res) {
  console.log(req.body);
  var email = req.body.email;
  var password_hash = req.body.password_hash;
  var sql = `select id, role from user where email ='${email}' and password_hash = '${password_hash}'`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      res.send(err)
      return;
    }
    if (result.length == 1) {
      res.json({ isAuthenticated: true, userId: result[0].id, userRole: result[0].role})
    } else {
      res.json({ isAuthenticated: false, userId: null, userRole: null})
    }
    console.log(res);
  });
});

/* GET player using id */
app.get('/players/:id', function (req, res) {
  var playerid = req.params.id;
  var sql = `select * from player where id ='${playerid}'`;
  console.log(sql);
  connection.query(sql, function (err, result) {
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
      SELECT  player.id, player.name as playername, player.position, player.sub_position as subposition , player.current_market_value as currentMarketValue, club.name as clubname, player.image_url as imageUrl
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

  connection.query(sql, params, function (err, result) {
    console.log(this.sql)
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching players.' });
      return;
    }
    res.json(result)
  });
});

/* Get top 15 players in a tournament */
app.get('/tournamentTop15/:tournamentId', function (req, res) {
  var tournamentId = req.params.tournamentId;
  var sql =`CALL tournament_top_15('${tournamentId}')`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      res.status(500);
	res.send(err); 
      return;
    }
    res.json(result[0])
  });
});

/* Get user team player details */
app.get('/teams/players', function (req, res) {
  console.log(req.query);
  var userid = req.query.userId;
  console.log(userid)
  var sql = `SELECT T.id as teamId, T.name as teamName, T.logo_url, P.name as playerName, P.id as playerId
                   from team T left outer join player_team PT on T.id=PT.team_id left outer  join player P on P.id=PT.player_id
                   where T.user_id = ${userid}`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      res.send(err)
      return;
    }
    res.json(result);
  });
});

/* add player to team */
app.post('/teams/players', function (req, res) {
  console.log(req.body);
  var userid = req.body.userId;
  var teamid = req.body.teamId;
  var playerid = req.body.playerId;
  var date = format(new Date());
  var sql = `insert into player_team(player_id, team_id, user_id, date_added) values (${playerid},${teamid},${userid},'${date}')`;
  console.log(sql);
   connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      res.status(400);
      res.send(err);
      return;
    } else if (result.affectedRows === 0) {
      res.status(400).json({ message: "Could not add player to team. The team may already have 11 players." });
      return;
    }
    res.json(result);
  });


});

/* delete player from team */
app.delete('/teams/players', function (req, res) {
  console.log(req.query);
  var userId = req.query.userId;
  var teamId = req.query.teamId;
  var playerId = req.query.playerId;
  var sql = `DELETE from player_team where user_id = ${userId} and team_id = ${teamId} and player_id = ${playerId}`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      res.send(err)
      return;
    }
    res.send(result);
  });
});

/* update team name */
app.put('/teams/:id', function (req, res) {
  var teamId = req.params.id;
  var newName = req.body.newName;
  var sql = `UPDATE team set name= '${newName}' where id = ${teamId}`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    console.log(result);
    if (err) {
      res.send(err)
      return;
    }
    res.send(result);
  });
});

/* user register */
app.post('/register', function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var role = req.body.role;
  var sql = `INSERT into user(name, email, password_hash, role, funds_available)
             VALUES ('${name}', '${email}', '${password}', '${role}', 1000000)`;
  if (name && password) {
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        if (err.code == 'ER_DUP_ENTRY') {
		res.status(400);         
		res.send({ 'message': 'This email address has already been used!' })
        }
        else {
          res.send(err)
        }
        return;
      }
      var ret_string = `User Registration Complete (id:${result.insertId})`;
      res.send({ 'message': ret_string });
      //res.json(result)
    });
  }
});

/* get User  teams */
app.get('/teams', function (req, res) {
  var userid = req.query.userId;
  var sql = `SELECT T.id as teamId, T.name as teamName, T.logo_url
                   from team T 
                   where T.user_id = ${userid}`;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.json(result);
  });
});
// create a new team for a user
app.post('/teams', function (req, res) {
  var name = req.body.name;
  var logo_url = req.body.logoUrl;
  var user_id = req.body.userId;
  var sql = `INSERT into team(name, logo_url, user_id)
              VALUES ('${name}', '${logo_url}', '${user_id}')`;
  if (name && logo_url && user_id) {
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) {
        res.send(err)
        return;
      }
      var ret_string = `Team Creation Complete (id:${result.insertId})`;
      res.send({ 'message': ret_string });
    });
  }
});

//  fetch lifetime stats for a player 
app.get('/lifetimestats/:id', function (req, res) {
  var playerid = req.params.id;
  var sql = `call player_career_stats('${playerid}')`
  connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).send(err)
      return;
    }
    res.json(result[0]);
  });
});


// fetch tournament details  for 
app.get('/tournaments', function (req, res) {
  var sql = `SELECT * FROM tournament`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.message("Unable to fetch tournaments");
      res.status(500).send(err)
      return;
    }
    res.json(result)
  });

});

// fetch club list
app.get('/clubs', function (req, res) {
  var sql = `SELECT * FROM club`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.message("Unable to fetch clubs");
      res.status(500).send(err)
      return;
    }
    res.json(result)
  });

});

//get players of a clubç
app.get('/clubs/:clubId/players', (req, res) => {
  const clubId = req.params.clubId;

  // Call stored procedure
  connection.query('CALL get_club_player_points(?)', [clubId], (error, results) => {
    if (error) {
      console.error('Error calling stored procedure: ', error);
      res.status(500).send('Internal server error');
    } else {
      console.log('Results: ', results);
      res.status(200).json(results[0]);
    }
  });
});


// define the endpoint to fetch all user details
app.get('/users', (req, res) => {
  const query = 'SELECT id, name, email, role, funds_available FROM user';
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(result);
    }
  });
});



app.listen(80, function () {
  console.log('Node app is running on port 80');
});
