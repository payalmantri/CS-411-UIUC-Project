
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import Register from './Register';
import MainLayoutRoutes from './MainLayoutRoutes';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/Register' exact element={<Register />} />
          <Route path="*" element={<MainLayoutRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
