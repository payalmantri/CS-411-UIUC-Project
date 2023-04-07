import React from 'react';
import { BASE_URL } from '../constants';

const 
PlayerList = () => {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		fetch(`${BASE_URL}/players/12840`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setData(data);
			});
		
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'Right',
				alignItems: 'Right',
				height: '100vh'
			}}
		>	
			<h1>GeeksforGeeks is a Computer Science portal for geeks.</h1>
		</div>
	);
};

export default PlayerList;
