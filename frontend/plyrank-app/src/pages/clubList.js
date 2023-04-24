import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import Button from 'react-bootstrap/esm/Button';
import './styles/clubList.scss';
import ClubTopPlayers from './ClubTop15';


const ClubDetails = ()=> {
  const [clubs, setClubs] = useState([]);
    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/clubs`)
        let data = await response.json();
        // data = data.splice(0, 10);
        setClubs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClubs();
  }, []);

     function handleRowExpansion(row) {
		
       row.isExpanded = !row.isExpanded;
        setClubs([...clubs]);
    }
  return (
    <div className='club-list'>
      <h2>Club List</h2>
     
      <table className='club-table'>
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
      
        <tbody>
        {clubs.map((club) => 
        <>
            <tr key={club.id}>
              <td>{club.id}</td>
              <td>{club.name}</td>
              <td>
              <Button onClick={() => handleRowExpansion(club)}
                variant="outline-primary"
                size="sm"
              >
                View Top 15
              </Button>
                </td>
                
            </tr>
  {/* // Add a hidden row here to display the top 15 players for the club */}
          <>
            {club.isExpanded && (   
              <tr key={club.id+"TopPlayers"} hidden={!club.isExpanded} className='expanded-row'>
                <td colSpan="6">
                <div>
              
                <ClubTopPlayers clubID={club.id} />
        
       
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

export default ClubDetails;
