import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Table from '../table';
import './styles/teamDetails.scss';
import { BASE_URL } from '../constants';
// const fakeData = [
//   {
//     "id": "12",
//     "name": "PlayFc",
//     "logo_url": "http://www.example.com/bells?balance=authority&attack=bone",
//     "player_name": "Lionel Messi"
//   },
//   {
//     "id": "21",
//     "name": "BackFc",
//     "logo_url": "http://www.example.com/",
//     "player_name": "Jacob Strowski"
//   },
//   {
//     "id": "21",
//     "name": "BackFc",
//     "logo_url": "http://www.example.com/brother/brother.aspx",
//     "player_name": "Dan James"
//   },
//   {
//     "id": "12",
//     "name": "PlayFc",
//     "logo_url": "http://example.org/?bone=anger&birth=acoustics",
//     "player_name": "Blue Man"
//   },
// ];


const TeamDetails = () => {

  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamLogoUrl, setTeamLogoUrl] = useState('');
  const [teamData, updateTeamData] = useState([]);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/teams/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: localStorage.getItem('userId'), name: teamName, logoUrl: teamLogoUrl }),
    })
      .then((res) => res.json())
      .then((data) => {

        window.location.reload();
      })
      .catch((error) => console.error(error));



    setTeamName('');
    setTeamLogoUrl('');
    setShowForm(false);
  };


  React.useEffect(() => {
    // Fetch team names from API
    fetch(`${BASE_URL}/teams/players?userId=${localStorage.getItem('userId')}`)
      .then((response) => response.json())
      .then((data) => {
        let arrLen = data.length;
        let existingTeam = [];
        for (let i = 0; i < arrLen; i++) {
          const { teamId, teamName, logo_url, playerName, playerId } = data[i];
          const exists = existingTeam.findIndex(team => team.id === teamId && team.name === teamName);
        
          if (exists != -1) {
            existingTeam[exists].player_names.push({playerId, playerName});
                 } else {
            if(playerName === null) {
                existingTeam.push({
                  id: teamId,
                  name: teamName,
                  logo_url: logo_url,
                  player_names: []
                });
            } else {
            existingTeam.push({
              id: teamId,
              name: teamName,
              logo_url: logo_url,
              player_names: [{playerId, playerName}]
            });
          }
        }
        }
        updateTeamData(existingTeam);
      })
      .catch((error) => console.error(error));
  }, []);


  // setShowForm(!showForm) is used to toggle the form
  function toggleForm() {

    setShowForm(!showForm);
    if (showForm) {
      setTeamName('');
      setTeamLogoUrl('');
    }
  }
  return (
    <div className='team-details'>
      <div className='add-new-team-container'>
        <Button className="add-new-team-expansion-button" onClick={() => toggleForm()}>Create new team</Button>
        {showForm && (
        <form  className='add-new-team-form'>
          <label className='add-new-team-form-input '>
            Team name:
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          </label>
          <br />
          <label  className='add-new-team-form-input'>
            Team logo URL:
            <input type="text" value={teamLogoUrl} onChange={(e) => setTeamLogoUrl(e.target.value)} />
          </label>
          <br />
          <button onClick={handleFormSubmit}>Submit</button>
        </form>
      )}

      </div>
      <div className='team-list'>
        {/* TODO : Show list of teams  with players table here */}

      </div>
      {teamData.map((d, idx) => {
        return (
          <Table teamName={d.name} key={d.name} players={d.player_names} teamId={d.id} />
        )
      })}

    </div>
  );
};

export default TeamDetails;