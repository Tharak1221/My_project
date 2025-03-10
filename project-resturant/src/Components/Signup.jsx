import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
 
 
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
 
  const usernameRegex = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{6,14})[A-Za-z0-9]$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
 
 
  const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
  
 
  const handleSignup = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }
   
    // if (!usernameRegex.test(username)) {
    //   alert('Username must be 8-16 characters long, alphanumeric (with "-" or "_" allowed in the middle), and cannot start or end with a special character.');
    //   return;
    // }
   
    // if (!emailRegex.test(email)) {
    //   alert('Please enter a valid email address.');
    //   return;
    // }
   
    // if (!passwordRegex.test(password)) {
    //   alert('Password must be 8-16 characters long, include at least one capital letter, one number, and one special character.');
    //   return;
    // }
   
    // // Validate phone number
    // if (!phoneRegex.test(phone)) {
    //   alert('Please enter a valid Indian phone number (e.g., +919876543210 or 9876543210).');
    //   return;
    // }
   
    // If validations pass, store user details in localStorage
    const userDetails = { name, username, email, password, phone };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setMessage('Signup Successful! Please login.');
   
    // Optionally clear the form fields
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
  };
 
  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
        <div>
              <Button variant="primary" className="me-3" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
              <Button variant="secondary"  onClick={() => navigate('/login')}>
                login
              </Button>
            </div>
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=" "
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder=" "
          />
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};
 
export default Signup;