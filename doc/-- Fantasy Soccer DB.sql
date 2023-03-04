
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
    name varchar(255) not null,
    email varchar(255) not null,
    password_hash varchar(255) not null,
    role enum('admin', 'user') not null,
    funds_available int not null,
    primary key (id)
);

-- Create club table
Create table club
(
    id int not null,
    name varchar(255) not null,
    url varchar(2048) not null,
    primary key (id)
);

-- Create player table
Create table player
(
    id int not null,
    name varchar(255) not null,
    position varchar(255) not null,
    club_id int not null,
    country_of_citizenship varchar(255) not null,
    sub_position varchar(255) not null,
    date_of_birth date not null,
    current_market_value int not null,
    image_url varchar(2048) not null,
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
    logo_url varchar(2048) not null,
    created_at date not null,
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

Create table game_player_stats
(
    player_id int not null,
    game_id int not null,
    goals int not null,
    assists int not null,
    yellow_cards int not null,
    red_cards int not null,
    primary key (player_id, game_id),
    foreign key (player_id) references player(id),
    foreign key (game_id) references game(id)
);




