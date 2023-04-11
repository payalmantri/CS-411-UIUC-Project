import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { BASE_URL } from '../constants';

function TournamentTopPlayers({ tournamentID }) {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    async function fetchTopPlayers() {
      const response = await fetch(`${BASE_URL}/tournamentTop15/${tournamentID}`);
      const data = await response.json();
      setTopPlayers(data);
    }
    fetchTopPlayers();
  }, [tournamentID]);

  return (
    <div>
      <h2>Top 15 Players for Tournament {tournamentID}</h2>
      <table className='players-table'>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Yellow Cards</th>
            <th>Red Cards</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.goals}</td>
              <td>{player.assists}</td>
              <td>{player.yellow_cards}</td>
              <td>{player.red_cards}</td>
                <td>{player.total_points}</td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentTopPlayers;
