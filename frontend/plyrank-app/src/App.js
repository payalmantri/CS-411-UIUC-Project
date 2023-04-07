import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Events from './pages/events';
import  Blogs from './pages/blogs';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  return (
    <div className="App">
    <Router>
    <Routes>
    <Route path='/' exact element={<Login/>} />
         <Route path='/Home' exact element={<Home />} />
         <Route path='/events' element={<Events />} />
         <Route path='/Register' element={<Register />} />
  
         <Route path='/blogs' element={<Blogs />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
