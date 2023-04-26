
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClubDetails from './pages/clubList';
import PlayerList from './pages/playerList';
import TeamDetails from './pages/teamDetails';
import Navbar from './components/Navbar';
import TournamentList from './pages/tournamentList';
import AdminPage from './pages/adminPage';



function MainLayoutRoutes() {
    return (
        <div>

            <Navbar />
            <Routes>
                <Route path='/Home' element={<TeamDetails />} />
                <Route path='/ClubDetails' element={<ClubDetails />} />
                <Route path='/PlayerSearch' element={<PlayerList />} />
                <Route path='/TournamentList' element={<TournamentList />} />
                <Route path="/Admin" element={<AdminPage />} />
            </Routes>
       
        </div>
    )
}

export default MainLayoutRoutes;