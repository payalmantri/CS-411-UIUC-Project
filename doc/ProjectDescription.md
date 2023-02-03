<h1 align="center">Fantasy Football </h1>

## Table of contents

- [Project Summary](#project-summary)
- [Description](#description)
- [Usefulness](#usefulness)
- [Realness](#realness)
- [Functionality description](#functionality-description)
- [UI Mockup](#ui-mockup)
- [Work Distribution](#work-distribution)


## Project Summary
This project is a portal for team management of various teams to search players based on differnt parametres, buy them in theie team etch


## Description



## Usefulness

This project will be useful for the users to search for players based on different parametres like name, position, rating , base price etc. The team  owner can add buy(insert) players to his team, remove(delete) players from his team, update(update) the players in his team and view the players in his team.


## Realness
The database server will store the below entities:


|   Entity    |   Attributes                 |  
| ----------- | -----------------------------| 
| User        |    userId, name, email, password, role |
| Team        |    teamId, teamName, userId, teamValue, teamRating |
| Player      |    playerId, playerName, playerPosition, playerRating, playerBasePrice, playerTeamId, playerTeamName, playerTeamValue, playerTeamRating |


### Data Source Links: <br /> 
#### Player data source:: 
https://www.kaggle.com/datasets/promptcloud/walmart-product-dataset-usa


## Functionality Description

Firstly, the login screen is displayed and the user is prompted to enter his/her login credentials.  
The admin can add new users to the database. The admin can also delete users from the database. The admin can also update the user details in the database. The admin can also view the list of users in the database. Admin can also view all the teams' detail in the database. He can also view all the players' detail in the database.


The team owner will see list of players in his current team as landing page . He can search for players based on different parametres like name, position, rating , base price etc. The team  owner can add buy(insert) players to his team, remove(delete) players from his team, update(update) the players in his team and view the players in his team.  

## UI Mockup

![Sign Up page](UImockup/SignUp.jpeg "Sign Up Page.")

![Login page](UImockup/Login.jpeg "Login Page.")

Once the user enters his login credentials and is authenticated, the landing page is displayed. The user can then search for players  in the search bar. 

![Landing page after login](UImockup/LandingPage.jpeg "Landing Page.")


## Work Distribution

- Each member will design and develop the UI frontend and backend operations for their specified page.
- All team members will equally contribute to DB UML diagrams and design.
- Each page will require querying based on concepts from the course. We plan to include Triggers, Stored Procedures and CRUD operations.


|   Member               |    Work distribution   |
| ---------------------- | ---------------------- |
| Payal Mantri  |  Initial front end set up     |
| Ammar Raza    |  Backend |
| Stephen Moy   |    |
| Youhan Li     |  | 

</br>
