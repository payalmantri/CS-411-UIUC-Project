import React from 'react';
import Navbar from '../components/Navbar';
  
const Home = () => {
  return (
    <div
      style={{
        display: 'flex',

        alignItems: 'Right',
        height: '100vh'
      }}
    >
         <Navbar />
      <h1>Welcome to GeeksforGeeks</h1>
    </div>
  );
};
  
export default Home;