import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Table from '../table';
import './styles/teamDetails.scss';
import { BASE_URL } from '../constants';
const fakeData = [
  {
    "id": "12",
    "name": "PlayFc",
    "logo_url": "http://www.example.com/bells?balance=authority&attack=bone",
    "player_name": "Lionel Messi"
  },
  {
    "id": "21",
    "name": "BackFc",
    "logo_url": "http://www.example.com/",
    "player_name": "Jacob Strowski"
  },
  {
    "id": "21",
    "name": "BackFc",
    "logo_url": "http://www.example.com/brother/brother.aspx",
    "player_name": "Dan James"
  },
  {
    "id": "12",
    "name": "PlayFc",
    "logo_url": "http://example.org/?bone=anger&birth=acoustics",
    "player_name": "Blue Man"
  },
];


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
        let arrLen = fakeData.length;
        let existingTeam = [];
        for (let i = 0; i < arrLen; i++) {
          const { id, name, logo_url, player_name } = fakeData[i];
          const exists = existingTeam.findIndex(team => team.id === id && team.name === name);
          console.log(exists);
          if (exists != -1) {
            existingTeam[exists].player_names.push(player_name);
          } else {

            existingTeam.push({
              id: id,
              name: name,
              logo_url: logo_url,
              player_names: [player_name]
            });
          }
        }
        console.log(existingTeam);

        updateTeamData(existingTeam);


        window.location.reload();
      })
      .catch((error) => console.error(error));



    setTeamName('');
    setTeamLogoUrl('');
    setShowForm(false);
  };

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
          
        </form>
      )}
        <button onClick={handleFormSubmit}>Show Teams</button>
      </div>
      <div className='team-list'>
        {/* TODO : Show list of teams  with players table here */}

      </div>
      {teamData.map((d, idx) => {
        return (
          <Table teamName={d.name} key={d.name} playerNames={d.player_names} />
        )
      })}

    </div>
  );
};

export default TeamDetails;