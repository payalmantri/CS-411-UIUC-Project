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
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/'>Sign Out</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
