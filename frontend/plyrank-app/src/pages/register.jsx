import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import { Form, Button, Alert,  } from 'react-bootstrap';
import './styles/register.scss';
import {  toast } from 'react-toastify';

const Register = () => {
 
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password, role: 'User'})
      };
      fetch(`${BASE_URL}/register`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
              setSubmitted(true);
              setError(false);
              navigate('/');
      })
      .catch(error=>{
        console.log(error);
        toast.error("Error in registering the user");
        
      })
    
    }
  };
 
  return (
    <div className="register-container ">
      <div className="register-header">
        <h1>User Registration</h1>
      </div>
 
      <div className="register-messages">
        {error && <Alert variant="danger">Please enter all the fields</Alert>}
        {submitted && <Alert variant="success">User {name} successfully registered!!</Alert>}
      </div>
 
      <Form onSubmit={handleSubmit} className="register-form">
    
        <Form.Group className='form-group'>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleName} value={name} type="text" placeholder="Enter name" />
        </Form.Group>
 
        <Form.Group  className='form-group'>
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleEmail} value={email} type="email" placeholder="Enter email" />
        </Form.Group>
 
        <Form.Group  className='form-group'>
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handlePassword} value={password} type="password" placeholder="Password" />
        </Form.Group>
 
        <Button variant="primary" type="submit" className="register-button">
          Submit
        </Button>

        {/* cancel button */}
        <Button variant="danger" type="cancel" className="cancel-button" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default Register;
