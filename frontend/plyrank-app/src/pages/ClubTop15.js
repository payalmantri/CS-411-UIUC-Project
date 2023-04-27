import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';

function ClubTopPlayers({ clubID }) {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    async function fetchTopPlayers() {
      const response = await fetch(`${BASE_URL}/clubs/${clubID}/players/`);
      const data = await response.json();
      setTopPlayers(data);
    }
    fetchTopPlayers();
  }, [clubID]);

  return (
    <div>
      <h2>Top 15 Players for Club {clubID}</h2>
      <table className='players-table'>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player) => (
            <tr key={player.player_id}>
              <td>{player.player_name  }</td>
              <td>{player.player_goals}</td>
              <td>{player.player_assists}</td>
                <td>{player.player_points}</td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClubTopPlayers;
