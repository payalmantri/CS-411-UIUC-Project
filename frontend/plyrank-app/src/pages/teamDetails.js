import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import './styles/teamDetails.scss';
import { BASE_URL } from '../constants';

const TeamDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamLogoUrl, setTeamLogoUrl] = useState('');


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
        // refresh the page
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
    if(showForm) {
      setTeamName('');
      setTeamLogoUrl('');
    }
  }
  return (
    <div className='team-details'>
      <div className='add-new-team-container'>
      <Button className="add-new-team-expansion-button" onClick={() => toggleForm()}>Create new team</Button>
      {showForm && (
        <form onSubmit={handleFormSubmit} className='add-new-team-form'>
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
          <button type="submit">Create team</button>
        </form>
      )}
      </div>
      <div className='team-list'>
      {/* TODO : Show list of teams  with players table here */}

      </div>
    </div>
  );
};

export default TeamDetails;