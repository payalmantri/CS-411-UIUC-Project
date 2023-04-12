import React from 'react';
import { BASE_URL } from '../constants';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';


function TeamTable(props) {
  console.log("props",props);
  const [showEditPage, setShowEditPage] = React.useState(false);
  const { teamName, players, teamId } = props;
  const [newteamName, setNewTeamName] = useState('');
  function deletePlayer(playerId) {
    // e.preventDefault();
    fetch(`${BASE_URL}/teams/players?userId=${localStorage.getItem('userId')}&teamId=${teamId}&playerId=${playerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {

        window.location.reload();
      })
      .catch((error) => console.error(error));

  };

  const editTeamName = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/teams/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: localStorage.getItem('userId'), newName: newteamName }),
    })
      .then((res) => res.json())
      .then((data) => {

        window.location.reload();
      })
      .catch((error) => console.error(error));

  };


  return (
    <div className='player-table'>

      <div className='team-name-header-container' >
        <div className='team-name-header-display'>{teamName}
        {!showEditPage && <Button onClick={() => setShowEditPage(!showEditPage)} variant='primary' >Edit Team Name</Button> }
        </div>
        {showEditPage && <div className='team-name-edit-form'>
          <form className='' >
          <label className='team-name-edit-form-input '>
            New Team name:
            <input type="text"required value={newteamName} onChange={(e) => setNewTeamName(e.target.value)} />
          </label>
          <button type="cancel" onClick={() => setShowEditPage(false)}>Cancel</button>
          <button type="submit" onClick={editTeamName}>Submit</button>
        
          </form>
        </div>}
       


      </div>
      {players.map((d, idx) => {
        return (
          <div className='player-row' key={d.playerName} >
            {d.playerName}
            <span>
              <Button onClick={() => deletePlayer(d.playerId)} variant='primary' >Delete</Button></span>
          </div>
        )
      })}
      { players.length === 0 && <div className='player-row' key={teamId}> No players added yet </div>}


    </div>

  )
}

export default TeamTable;
