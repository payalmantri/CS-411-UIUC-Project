import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../constants';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import logo from '../images/logo.png';
import './styles/login.scss';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const navigate = useNavigate();
  const users = [
    {
      username: "test",
      password: "test"
    }];

  const handleSubmit = (e) => {
    console.log("Test");
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password_hash: password })
    };
    fetch(`${BASE_URL}/login`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.isAuthenticated == true) {
          setAuthenticated(true)
          localStorage.setItem("authenticated", true);
          localStorage.setItem("userId", data.userId)
          localStorage.setItem("userRole", data.userRole)
          navigate("/Home");
        }
        else {
          console.error("Could not login");
        }
      });
  };

  const navigateToRegister = () => {
    navigate("/Register");
  }

  return (
    <Container className="login-container">
      <Row>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </Col>
        <Col xs={12} md={6} className="align-items-center justify-content-center">
          <div className="login-form-container" >
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <div className="submit-button-panel">
                <Button variant="primary" type="submit" className="mr-2">
                  Login
                </Button>
              </div>
            </Form>


          </div>
          <div className="navigate-to-register-container">
           <a href="#" onClick={navigateToRegister}>Don't have an account? Register here</a>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;
