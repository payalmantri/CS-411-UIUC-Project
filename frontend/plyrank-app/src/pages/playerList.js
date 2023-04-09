import React from 'react';
import { BASE_URL } from '../constants';
import './playerList.css'

const
	PlayerList = () => {
		const [playerList, setData] = React.useState(null);

		function fetchPlayers(event){
			event.preventDefault();
			const formData = new FormData(event.target);
			const data = Object.fromEntries(formData);
			console.log(data);
			// use fields from data to make a query to the backend as query params
			// and then set the data to the response


			fetch(`${BASE_URL}/players?playername=${data.playername}
			&position=${data.position}&clubname=${data.clubname}&minMarketValue=${data.minMarketValue}&maxMarketValue=${data.maxMarketValue}&subposition=${data.subposition}`, {

		
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setData(data);
				});
		};
		
	
		return (
			<div >
				{/* search componenent */}
				<div >
				<form onSubmit={	fetchPlayers}>
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
							<option value="Center-Back">Center Back</option>
							<option value="Center-Forward">Center Forward</option>
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


			
				</div>

			<div>
				{playerList && playerList.map((player) => (
					// show table of players
					<table>
						<tr>
							<th>Player Name</th>
							<th>Position</th>
							<th>Club Name</th>
							<th>Current Market Value</th>
							<th>Sub Position</th>
						</tr>
						<tr>
							<td>{player.playername}</td>
							<td>{player.position}</td>
							<td>{player.clubname}</td>
							<td>{player.currentmarketvalue}</td>
							<td>{player.subposition}</td>
						</tr>
					</table>
				))}
			</div>
			</div>
		);
	};

export default PlayerList;
