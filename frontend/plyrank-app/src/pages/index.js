import React from 'react';
import Navbar from '../components/Navbar';
import PlayerList from './playerList';

const Home = () => {
  return (

    <div>
      <Navbar />
      <h1>Welcome to GeeksforGeeks</h1>
      <PlayerList></PlayerList>
    </div>
  );
};

export default Home;