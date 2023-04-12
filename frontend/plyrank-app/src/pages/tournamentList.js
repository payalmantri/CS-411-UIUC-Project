import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import './styles/tournamentList.scss';
import TournamentTopPlayers from './tournamentTop15';


const TournamentList = ()=> {
  const [tournaments, setTournaments] = useState([]);
    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tournaments`)
        let data = await response.json();
        // data = data.splice(0, 10);
        setTournaments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTournaments();
  }, []);

     function handleRowExpansion(row) {
       row.isExpanded = !row.isExpanded;
        setTournaments([...tournaments]);
    }
  return (
    <div className='tournament-list'>
      <h2>Tournament List</h2>
     
      <table className='tournament-table'>
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th></th>
          </tr>
        </thead>
      
        <tbody>
        {tournaments.map((tournament) => 
        <>
            <tr key={tournament.id}>
              <td>{tournament.id}</td>
              <td>{tournament.name}</td>
              <td>{tournament.country}</td>
              <td>{tournament.type}</td>
              <td>{tournament.sub_type}</td>
              <td>
              <Button onClick={() => handleRowExpansion(tournament)}
                variant="outline-primary"
                size="sm"
              >
                View Top 15
              </Button>
                </td>
                
            </tr>
  {/* // Add a hidden row here to display the top 15 players for the tournament */}
          <>
            {tournament.isExpanded && (   
              <tr key={tournament.id+"TopPlayers"} hidden={!tournament.isExpanded} className='expanded-row'>
                <td colSpan="6">
                <div>
              
                <TournamentTopPlayers tournamentID={tournament.id} />
        
       
                </div>
                </td>
              </tr>
            )}
          </>
        </>

        )}
        </tbody>
       
      </table>
       
    </div>
  );
};

export default TournamentList;
