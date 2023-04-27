
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import MainLayoutRoutes from './MainLayoutRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';


function App() {
  // toast.configure();
  return (
    <div className="App">
            <ToastContainer />
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
