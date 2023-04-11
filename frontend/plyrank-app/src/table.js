import React from 'react';
import { BASE_URL } from './constants';
import { useState } from 'react';


function Table(props) {
  const [showEditPage, setShowEditPage] = React.useState(false);
  const { teamName, playerNames, teamId, playerId } = props;
  const [newteamName, setNewTeamName] = useState('');
  const deletePlayer = (e) => {
    e.preventDefault();
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
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", marginTop: 10 }}>

      <div className='header' style={{ fontSize: 25, backgroundColor: "grey" }}>{teamName}
        {showEditPage && <div>
          <form
          lassName='add-new-team-name-form'>
          <label className='add-new-team-name-form-input '>
            Team name:
            <input type="text"required value={newteamName} onChange={(e) => setNewTeamName(e.target.value)} />
          </label>
          <button type="submit" onClick={editTeamName}>Submit</button>
          </form>
        </div>}
        <span>
          <button onClick={() => setShowEditPage(!showEditPage)}>Edit Team Name</button></span>


      </div>
      {playerNames.map((d, idx) => {
        return (
          <div className='row' key={d}>
            {d}
            <span>
              <button onClick={deletePlayer}>Delete</button></span>
          </div>
        )
      })}


    </div>
    // <div style={{ display: 'table', width: '100%' }}>
    //   <div style={{ display: 'table-header-group', backgroundColor: '#eee', textAlign:"center" }}>
    //     Header 1
    //   </div>
    //   <div style={{ display: 'table-row-group' }}>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 1</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 2</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 3</div>
    //     </div>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 4</div>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 5</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 6</div>
    //     </div>
    //     <div style={{ display: 'table-row' }}>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 7</div>
    //       <div style={{ display: 'table-cell', padding: '10px' }}>Cell 8</div>
    //       <div style={{ display: 'table-cell', padding: '10px', backgroundColor: '#eee' }}>Cell 9</div>
    //     </div>
    //   </div>
    // </div>

  )
}

export default Table;
