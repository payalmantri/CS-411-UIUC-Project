import React from 'react';
import { BASE_URL } from '../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles/playerList.scss'
import { Dropdown } from 'bootstrap';
import { toast } from 'react-toastify';

const
	PlayerList = () => {
		const [playerList, setData] = React.useState(null);
		const [showModal, setShowModal] = React.useState(false);
		const [selectedPlayer, setSelectedPlayer] = React.useState(null);
		const [teamNames, setTeamNames] = React.useState(null);
		const [selectedTeam, setSelectedTeam] = React.useState('');


		function openAddPlayerModal(player) {
			setSelectedPlayer(player);
			setShowModal(true);
		}

		function handleModalClose() {
			setShowModal(false);
		}

		function handleTeamChange(event) {
			console.log(event.target.value);
			setSelectedTeam(event.target.value);
		}

		function handleTeamSelect() {
			// get the team id from the value of the select
			// and then call the API to add the player to the team
			// and then close the modal
			const teamId = selectedTeam;
			console.log(teamId);
			fetch(`${BASE_URL}/teams/players`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: localStorage.getItem('userId'), teamId: teamId, playerId: selectedPlayer.id }),
			})
				.then((res) => {
					if (res.status === 200) {
						return res.json();
					} else {
						
						throw new Error('Error adding player to team');
					}
				})
				.then((data) => {
					console.log(data);
					handleModalClose();
				})
				.catch((error) => {
					console.error(error);
					toast.error('Error adding player to team');
				})

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
					// get only top 15 players
					data = data.slice(0, 15);
					setData(data);
				});
		};

		function showPlayerDetails(player) {
			player.isExpanded = !player.isExpanded;
			// player.lifetimeStats = {}
			setData([...playerList]);
			if(player.isExpanded && !player.lifetimeStats) {
				fetchPlayerDetails(player);
			}
		}

		function fetchPlayerDetails(player) {

			fetch(`${BASE_URL}/lifetimestats/${player.id}`)
				.then((res) => res.json())
				.then((data) => {
					
					if(data.length > 0) {
						player.lifetimeStats =  data[0];
					}
					console.log(player);
					setData([...playerList]);
				})
				.catch((error) => {
					player.isExpanded = false;
					console.error(error);
				});
				}


				


		return (
			<div className='playerSearch' >
				{/* search componenent */}
				<div className='search-container'>
					<form onSubmit={fetchPlayers} className='search-form'>
						{/* playername */}
						<div className='search-input'>
							<span> Player Name: </span>
							<input type="text" name="playername" />
						</div>
						{/* {club Name} */}
						<div className='search-input'>
							<span> Club Name: </span>
							<input type="text" name="clubname" />
						</div>
						{/* position as a select dropdown */}
						<div className='search-input'>
							<span> Position: </span>
							<select name="position">
								<option value="">Select</option>
								<option value="Attack">Attack</option>
								<option value="Defender">Defender</option>
								<option value="Midfield">Midfielder</option>
								<option value="Goalkeeper">Goalkeeper</option>
							</select>
						</div>
						{/* sub Position as a select dropdown */}
						<div className='search-input'>
							<span> Sub Position: </span>
							<select name="subposition">
								<option value="">Select</option>
								<option value="Centre-Back">Center Back</option>
								<option value="Centre-Forward">Center Forward</option>
								<option value="Central Midfield">Central Midfield</option>
								<option value="Defensive Midfield">Defensive Midfield</option>
								<option value="Right-Back">Right Back</option>
								<option value="Left-Back">Left Back</option>
							</select>
						</div>

						{/* current Market Value  as min and max */}
						<div className='search-input'>
							<span> Current Market Value: </span>
							<input type="number" name="minMarketValue" placeholder='min' />
							<input type="number" name="maxMarketValue" placeholder='max' />
						</div>

						<div className='search-input submit-button'>
							<input type="submit" value="Submit" />
						</div>
					</form>
				</div>

				<div>
					{playerList && playerList.length > 0 && (
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
								{playerList.map((player) => 
								<>
									<tr id={player.id} key={player.id}>
										<td>
											<img src={player.imageUrl} alt={`Image of ${player.playername}`} />
										</td>
										{/* Make name as link clicking on which should call the method showPlayerDetails */}
										<td onClick={() => showPlayerDetails(player)} className='playerName'>{player.playername}</td>

										<td>{player.position}</td>
										<td>{player.clubname}</td>
										<td>{player.currentMarketValue}</td>
										<td>{player.subposition}</td>
										<td>
											<button onClick={() => openAddPlayerModal(player)}>Add to Team</button>
										</td>
									</tr>
									<>
									{ player.isExpanded && (
										<tr className='playerDetails'>
											<td colSpan='7'>
												{ player.lifetimeStats && (
													<>
														<p>Goals: {player.lifetimeStats.goals}</p>
														<p>Assists: {player.lifetimeStats.assists}</p>
														<p>Yellow Cards: {player.lifetimeStats.yellow_cards}</p>
														<p>Red Cards: {player.lifetimeStats.red_cards}</p>
													</>
												)}
												{ !player.lifetimeStats && (
													<p>No lifetime stats available</p>
												)}
												
											</td>
										</tr>

										)}
									</>
								</>

								)}
								
							</tbody>
						</table>
					)}

					{playerList && playerList.length === 0 && (
						<p className='no-players'>No players found</p>
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
								

								<select id="team-select" value={selectedTeam} onChange={handleTeamChange}>
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
								<Button variant="primary" onClick={handleTeamSelect}>									Add Player
								</Button>
							</Modal.Footer>
						</Modal>
					)}

				</div>

			</div>
		);
	};

export default PlayerList;
