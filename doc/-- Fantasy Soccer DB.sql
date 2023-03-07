
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
    id int not null,
    name varchar(255) not null,
    start_date date not null,
    venue varchar(255) not null,
    type varchar(255) not null,
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
Create table game
(
    id int not null,
   home_club_id int not null,
    away_club_id int not null,
    home_club_score int not null,
    away_club_score int not null,
    tournament_id int not null,
    date_played date not null,
    primary key (id),
    foreign key (home_club_id) references club(id),
    foreign key (away_club_id) references club(id)
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



Select * from game_player_stats where player_id = 1 and game_id = 1;

Select sum(goals) as goals, sum(assists) as assists, sum(yellow_cards) as yellow_cards, sum(red_cards) as red_cards 
from game_player_stats
 where player_id = 1 and game_id in (select id from game where tournament_id = 1);

--  Write query to fetch all stats of all players in a tournament
Select player_id, name, sum(goals) as goals, sum(assists) as assists, sum(yellow_cards) as yellow_cards, sum(red_cards) as red_cards,
sum(goals) + sum(assists) as total_points
from game_player_stats
inner join player on player.id = game_player_stats.player_id
where game_id in (select id from game where tournament_id = 1)
group by player_id
order by total_points desc;
