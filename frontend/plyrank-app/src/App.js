import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Events from './pages/events';
import  Blogs from './pages/blogs';
import Login from './Login';
import {Register} from './Register';

function App() {
  return (
    <div className="App">
    <Router>
 
    <Routes>
    <Route path='/' exact element={<Login/>} />
         <Route path='/Home' exact element={<Home />} />
         <Route path='/about' element={<About />} />
         <Route path='/events' element={<Events />} />
    
       
         <Route path='/blogs' element={<Blogs />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
