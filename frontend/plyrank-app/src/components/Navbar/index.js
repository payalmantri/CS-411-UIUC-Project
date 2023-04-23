import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';


const Navbar = () => {
	const userRole = localStorage.getItem('userRole');
	const handleSignOut = () => {
		localStorage.clear();
		
	  };
	
return (
	<>
	<Nav>
		<Bars/>
		<NavMenu>
		<NavLink to='/Home' >
			Home
		</NavLink>
		<NavLink to='/PlayerSearch' >
			Player Search
		</NavLink>
		<NavLink to='/ClubDetails' >
			Clubs
		</NavLink>
		<NavLink to='/TournamentList' >
			Tournaments
		</NavLink>
		{userRole === 'admin' && (
			<NavLink to='/Admin' >
				Admin
				</NavLink>	)}
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink onClick={handleSignOut}
		to='/'>Sign Out</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
