
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
