import React from 'react';
import { BASE_URL } from '../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './playerList.css'

const
	PlayerList = () => {
		const [playerList, setData] = React.useState(null);
		const [showModal, setShowModal] = React.useState(false);
		const [selectedPlayer, setSelectedPlayer] =React.useState(null);
		const [teamNames, setTeamNames] = React.useState(null);
		const [selectedTeam, setSelectedTeam] = React.useState('');


		function handleAddPlayerToTeam(player) {
			setSelectedPlayer(player);
			setShowModal(true);
		}

		function   handleModalClose() {
			setShowModal(false);
		}

		function handleTeamSelect(event) {
			setSelectedTeam(event.target.value);
			fetch(`${BASE_URL}/teams/players`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId : localStorage.getItem('userId'), teamId: event.target.value, playerId: selectedPlayer.id }),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					handleModalClose();
				})
				.catch((error) => console.error(error));

		}

		React.useEffect(() => {
			// Fetch team names from API
			fetch(`${BASE_URL}/teams?userId=${localStorage.getItem('userId')}`)
				.then((response) => response.json())
				.then((data) => {
					setTeamNames(data);
				})
				.catch((error) => console.error(error));
		}, []);


		function fetchPlayers(event) {
			event.preventDefault();
			const formData = new FormData(event.target);
			const data = Object.fromEntries(formData);
		
			// use fields from data to make a query to the backend as query params
			// and then set the data to the response


			fetch(`${BASE_URL}/players?playerName=${data.playername}
			&position=${data.position}&clubName=${data.clubname}&minMarketValue=${data.minMarketValue}&maxMarketValue=${data.maxMarketValue}&subposition=${data.subposition}`, {


				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},

			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					// get only top 15 players
					data = data.slice(0, 15);
					setData(data);
				});
		};


		return (
			<div className='playerSearch' >
				{/* search componenent */}
				<div className='search'>
					<form onSubmit={fetchPlayers}>
						{/* playername */}
						<div>
							<span> Player Name: </span>
							<input type="text" name="playername" />
						</div>
						{/* position as a select dropdown */}
						<div>
							<span> Position: </span>
							<select name="position">
								<option value="Attack">Attack</option>
								<option value="Defender">Defender</option>
								<option value="Midfielder">Midfielder</option>
								<option value="Goalkeeper">Goalkeeper</option>
							</select>
						</div>
						{/* {club Name} */}
						<div>
							<span> Club Name: </span>
							<input type="text" name="clubname" />
						</div>
						{/* current Market Value  as min and max */}
						<div>
							<span> Current Market Value: </span>
							<input type="number" name="minMarketValue" placeholder='min' />
							<input type="number" name="maxMarketValue" placeholder='max' />
						</div>
						{/* sub Position as a select dropdown */}
						<div>
							<span> Sub Position: </span>
							<select name="subposition">
								<option value="Centre-Back">Center Back</option>
								<option value="Centre-Forward">Center Forward</option>
								<option value="Central Midfield">Central Midfield</option>
								<option value="Defensive Midfield">Defensive Midfield</option>
								<option value="Right-Back">Right Back</option>
								<option value="Left-Back">Left Back</option>
							</select>
						</div>
						<div >
							<input type="submit" value="Submit" />
						</div>
					</form>

					<hr></hr>

				</div>

				<div>
					{playerList && (
						<table className="playersTable">
							<thead>
								<tr>
									<th>Player Image</th>
									<th>Player Name</th>
									<th>Position</th>
									<th>Club Name</th>
									<th>Current Market Value</th>
									<th>Sub Position</th>
									<th>Add to Team</th>
								</tr>
							</thead>
							<tbody>
								{playerList.map((player) => (
									<tr id={player.id} key={player.id}>
										<td>
											<img src={player.imageUrl} alt={`Image of ${player.playername}`} />
										</td>
										<td>{player.playername}</td>
										<td>{player.position}</td>
										<td>{player.clubname}</td>
										<td>{player.currentMarketValue}</td>
										<td>{player.subposition}</td>
										<td>
                  <button onClick={() => handleAddPlayerToTeam(player)}>Add to Team</button>
                </td>
									</tr>
								))}
							</tbody>
						</table>
					)}
						{ selectedPlayer && (
							 <Modal
							 show={showModal}
							 onHide={handleModalClose}
							 backdrop="static"
							 keyboard={false}
						 >
							 <Modal.Header closeButton>
								 <Modal.Title>Add Player to Team</Modal.Title>
							 </Modal.Header>
							 <Modal.Body>
								 <p>Are you sure you want to add {selectedPlayer.playername} to your team?</p>
								 <label htmlFor="team-select">Select a team:</label>
								 <select id="team-select" value={selectedTeam} onChange={handleTeamSelect}>
									 <option value="">-- Select a team --</option>
									 {teamNames.map((team) => (
										 <option key={team.teamId} value={team.teamId}>
											 {team.teamName}
										 </option>
									 ))}
								 </select>
							</Modal.Body>
							 <Modal.Footer>
								 <Button variant="secondary" onClick={handleModalClose}>
									 Cancel
										</Button>
										<Button variant="primary" onClick={handleAddPlayerToTeam}>
											Add Player
										</Button>
									</Modal.Footer>
								</Modal>
							)}
					
				</div>

			</div>
		);
	};

export default PlayerList;
