import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Login = ({ setPage }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('userDetails');

    if (!storedData) {
      setMessage('No user found. Please sign up first.');
      return;
    }

    const { username, email, password: storedPassword } = JSON.parse(storedData);

    // Trim spaces and use lowercase to avoid case issues
    if (
      (identifier.trim().toLowerCase() === username.toLowerCase() ||
       identifier.trim().toLowerCase() === email.toLowerCase()) &&
      password === storedPassword
    ) {
      setMessage('Login Successful!');
      setTimeout(() => {
        setPage('home');  // 🔥 Make sure this matches the App.jsx state value
      }, 1500);
    } else {
      setMessage('Invalid details. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Username or Email</label>
          <input
            type="text"
            className="form-control"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          />
        </div>
        <Button type="submit" variant="primary">Login</Button>
      </form>
      {message && (
        <div className={`alert mt-3 ${message === 'Login Successful!' ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <p className="mt-3">
        Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setPage('signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
