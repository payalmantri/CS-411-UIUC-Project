# Node.js Express API Readme

This is a sample Express API Node.js app that connects to a MySQL database to retrieve and update data.

## Prerequisites
- Node.js installed on your local machine
- MySQL server installed on your local machine

## Installation

To install the API, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all the required dependencies.
3. Create a new MySQL database using the schema provided in `soccer_db_dump.sql`
4. Update the database connection configuration in `server.js` with your database details
4. Run `npm start` to start the API.
5. You can also use 'node server.js' to start the API.

## Usage

Once the API is up and running, you can perform CRUD operations on the data using HTTP requests. The app exposes several endpoints for retrieving and updating data:

- `GET /success`: returns a success message when attendance is marked successfully
- `GET /`: returns a hello message
- `POST /login`: validates a user's username and password and returns the user's ID and role if valid
- `GET /players/:id`: retrieves details for a player with the specified ID
- `GET /players`: retrieves a list of players filtered by various query parameters
- `GET /tournamentTop15/:tournamentId`: retrieves the top 15 players for a tournament with the specified ID
- `GET /teams/players`: retrieves a list of players for a user's team
- `POST /teams/addPlayer`: adds a player to a user's team

## Contributing

If you'd like to contribute to the API, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to merge your changes into the main repository.

