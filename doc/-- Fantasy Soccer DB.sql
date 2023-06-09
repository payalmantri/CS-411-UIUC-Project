
-- Fantasy Soccer DB 
-- Create database
Create database fantasy_soccer_db;

-- use database
Use fantasy_soccer_db;


-- Create user table 
-- role is either admin or user

Create table user
(
    id int not null,
    name varchar(255) ,
    email varchar(255) not null,
    password_hash varchar(255) not null,
    role enum('admin', 'user') not null,
    funds_available int ,
    primary key (id)
);

-- Create club table
Create table club
(
    id int not null,
    name varchar(255),
    url varchar(2048),
    primary key (id)
);

-- Create player table
Create table player
(
    id int not null,
    name varchar(255) not null,
    club_id int ,
    country_of_citizenship varchar(255) ,
    date_of_birth date ,
    position varchar(255) ,
    sub_position varchar(255) ,
    foot varchar(255) ,
    current_market_value int ,
    image_url varchar(2048),
    transfermarkt_url varchar(2048),
    primary key (id),
    foreign key (club_id) references club(id)
);


-- create table tournament
Create table tournament
(
    id varchar(255) not null,
    name varchar(255) not null,
    country varchar(255),
    type varchar(255) not null,
    sub_type varchar(255) not null,
    url varchar(2048) not null,
    primary key (id)
);
-- Create team table 
-- user id is unique as one user can only have one team -- can be changed later

Create table team
(
    id int not null,
    name varchar(255) not null,
    user_id int not null,
    logo_url varchar(2048),
    created_at date ,
    primary key (id),
    foreign key (user_id) references user(id)
);

-- Create player_team table
-- can be changed later
Create table player_team
(
    player_id int not null,
    team_id int not null ,
    user_id int not null,
    date_added date not null,
    primary key (player_id, team_id),
    foreign key (player_id) references player(id),
    foreign key (team_id) references team(id),
    foreign key (user_id) references user(id)
);

-- Create Table game
CREATE TABLE Games (
id INT NOT NULL,
home_club_id INT NOT NULL,
away_club_id INT NOT NULL,
home_club_score INT NOT NULL,
away_club_score INT NOT NULL,
tournament_id VARCHAR(255) NOT NULL,
date_played DATE,
PRIMARY KEY (id),
FOREIGN KEY (home_club_id) REFERENCES club(id) ON UPDATE CASCADE,
FOREIGN KEY (away_club_id) REFERENCES club(id) ON UPDATE CASCADE
);

-- Create table for player stats in each game
-- club id of the player in the game
Create table game_player_stats
(
    stat_id varchar(25) not null,
     game_id int not null,
    player_id int not null,
    player_club_id int , 
     yellow_cards int ,
      red_cards int ,
    goals int ,
    assists int ,
    primary key (player_id, game_id),
    foreign key (player_id) references player(id),
    foreign key (game_id) references Games(id),
    foreign key (player_club_id) references club(id)
);



-- // modify tournament id to varchar(255) i
ALTER TABLE tournament MODIFY COLUMN id varchar(255);

--  Write query to fetch all stats of all players in a tournament
SELECT player_id,
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
     WHERE tournament_id = (SELECT id FROM tournament WHERE name = 'LaLiga'))
GROUP BY player_id
ORDER BY total_points DESC
LIMIT 15;


-- Fetch lifetime stats of a player
SELECT player_id,
       name,
       sum(goals) AS goals,
       sum(assists) AS assists,
       sum(yellow_cards) AS yellow_cards,
       sum(red_cards) AS red_cards,
       sum(goals) + sum(assists) AS total_points
FROM game_player_stats
INNER JOIN player ON player.id = game_player_stats.player_id
WHERE player.name = 'Lionel Messi'
GROUP BY player_id
ORDER BY total_points DESC;

-- Fetch top 15 players based on goals and assists for a club
Select player_id, player.name,club.name, sum(goals) as goals, sum(assists) as assists
from game_player_stats
        inner join player on player.id = game_player_stats.player_id
        inner join club on club.id = player.club_id
where club.name = 'Fc Barcelona'
group by player_id
order by goals desc, assists desc
limit 15;

-- Add index on club name 
create index club_name_index on club(name);

-- STAGE 5


--  Stored Procedure to fetch top 15 players based on goals and assists for a tournament
DELIMITER $$
CREATE PROCEDURE tournament_top_15 (IN tournament_id VARCHAR(255))
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE player_id INT;
    DECLARE player_name VARCHAR(255);
    DECLARE goals INT;
    DECLARE assists INT;
    DECLARE yellow_cards INT;
    DECLARE red_cards INT;
    DECLARE total_points INT;
    DECLARE club_name VARCHAR(255);

    DECLARE player_stats_cur CURSOR FOR
        SELECT gps.player_id,
               p.name,
               SUM(gps.goals) AS goals,
               SUM(gps.assists) AS assists,
               SUM(gps.yellow_cards) AS yellow_cards,
               SUM(gps.red_cards) AS red_cards,
               SUM(gps.goals) + SUM(gps.assists) AS total_points
        FROM game_player_stats gps
                 INNER JOIN player p ON gps.player_id = p.id
        WHERE gps.game_id IN (
            SELECT g.id
            FROM Games g
            WHERE g.tournament_id = (SELECT id FROM tournament t WHERE t.id = tournament_id)
        )
        GROUP BY gps.player_id
        ORDER BY total_points desc ;
    DECLARE CONTINUE handler
        FOR NOT found
        SET done = 1;

    DROP TEMPORARY TABLE IF EXISTS temp_player_stats;
    CREATE TEMPORARY TABLE temp_player_stats (
                                                 player_id INT,
                                                 player_name VARCHAR(255),
                                                 club_name VARCHAR(255),
                                                 goals INT,
                                                 assists INT,
                                                 yellow_cards INT,
                                                 red_cards INT,
                                                 total_points INT
    );

    CREATE  INDEX ix_tmp_total_points ON temp_player_stats (total_points);

    OPEN player_stats_cur;

    read_loop: LOOP
        FETCH player_stats_cur INTO player_id, player_name, goals, assists, yellow_cards, red_cards, total_points;
        IF done = 1 THEN
            LEAVE read_loop;
        end IF;

        SELECT club.name INTO club_name
        FROM player
                 INNER JOIN club ON player.club_id = club.id
        WHERE player.id = player_id;

        INSERT INTO temp_player_stats (player_id, player_name, club_name, goals, assists, yellow_cards, red_cards, total_points)
        VALUES (player_id, player_name, club_name, goals, assists, yellow_cards, red_cards, total_points);
    END LOOP;

    CLOSE player_stats_cur;

    SELECT *
    FROM temp_player_stats
    ORDER BY temp_player_stats.total_points DESC
    limit 15;

    DROP TEMPORARY TABLE IF EXISTS temp_player_stats;
END$$
DELIMITER ;


-- Call the stored procedure
-- CALL tournament_top_15('BE1');




-- Stored Procedure to fetch lifetime stats of a player



DELIMITER //
CREATE PROCEDURE player_career_stats(IN playerid INT)
BEGIN
    DECLARE player_id INT;
    DECLARE name VARCHAR(255);
    DECLARE goals INT;
    DECLARE assists INT;
    DECLARE yellow_cards int;
	DECLARE red_cards int;
    DECLARE total_points INT;
    DECLARE done int default 0;
    
	DECLARE playerCur CURSOR FOR
		SELECT player.id, player.name
        FROM player
		WHERE player.id = playerid;
        
	DECLARE CONTINUE handler
		FOR NOT found
        SET done = 1;
        
	DROP TABLE IF EXISTS player_career_stats;
        
	CREATE TABLE player_career_stats (
		player_id int not null,
		name varchar(255) not null,
		goals int,
		assists int,
		yellow_cards int,
		red_cards int,
		total_points int
	);
        
	OPEN playerCur;
    PLAYER_LOOP:
	LOOP
		FETCH playerCur INTO player_id, name;
        
        IF done = 1 THEN
			LEAVE PLAYER_LOOP;
		end IF;
        
        SET goals = 0;
        SET assists = 0;
        SET yellow_cards = 0;
		SET red_cards = 0;
        SET total_points = 0;

        SELECT Sum(game_player_stats.goals)
        INTO   goals
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;
        
        SELECT Sum(game_player_stats.assists)
        INTO   assists
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;

        SELECT Sum(game_player_stats.yellow_cards)
        INTO   yellow_cards 
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;
        
        SELECT Sum(game_player_stats.red_cards)
        INTO   red_cards 
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;
        
        SET total_points = goals + assists;
        
        INSERT INTO player_career_stats
        (player_id,
         name,
         goals,
         assists,
         yellow_cards,
         red_cards,
         total_points)
        VALUES      (player_id,
					 name,
					 goals,
					 assists,
					 yellow_cards,
					 red_cards,
					 total_points);
    end LOOP;
    CLOSE playerCur;
    SELECT * FROM player_career_stats;
END //
DELIMITER ;





-- Trigger to check if team has more than 11 players
CREATE TRIGGER before_insert_player_team
BEFORE INSERT ON player_team
FOR EACH ROW
BEGIN
  DECLARE team_count INT;
  SET team_count = (SELECT COUNT(*) FROM player_team WHERE team_id = NEW.team_id);

  IF team_count >= 11 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot add player to team. Team already has 11 players.';
  END IF;
END;



-- Stored proceure to get club players 

CREATE PROCEDURE get_club_player_points (IN club_id INT)
begin
    DECLARE player_id INT;
    DECLARE player_name VARCHAR(255);
    DECLARE player_goals INT;
    DECLARE player_assists INT;
    DECLARE player_points INT;
    declare done int default 0;

    DECLARE player_cursor CURSOR FOR
        SELECT player.id,
               player.name
        FROM   player
        WHERE  player.club_id = club_id
        LIMIT 10;

    DECLARE CONTINUE handler
        FOR NOT found
        SET done = 1;

    DROP temporary TABLE IF EXISTS temp_player_points;

    CREATE temporary TABLE temp_player_points
    (
        player_id      INT,
        player_name    VARCHAR(255),
        player_goals   INT,
        player_assists INT,
        player_points  INT
    );

    open player_cursor;

    PLAYER_LOOP:
    LOOP
        FETCH player_cursor INTO player_id, player_name;

        IF done = 1 THEN
            LEAVE PLAYER_LOOP;
        end IF;

        SET player_goals = 0;
        SET player_assists = 0;
        SET player_points = 0;



        SELECT Sum(goals)
        INTO   player_goals
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;

        SELECT Sum(assists)
        INTO   player_assists
        FROM   game_player_stats
        WHERE  game_player_stats.player_id = player_id;
        SET player_points = player_goals + player_assists;
        INSERT INTO temp_player_points
        (player_id,
         player_name,
         player_goals,
         player_assists,
         player_points)
        VALUES      (player_id,
                     player_name,
                     player_goals,
                     player_assists,
                     player_points);
    end LOOP;
    CLOSE player_cursor;
    SELECT * FROM temp_player_points;


END



