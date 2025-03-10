import React, { useState } from 'react';

const Signup = ({ setPage }) => {  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setMessage('Signup Successful! Redirecting to login...');
    
    setTimeout(() => setPage('login'), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSignup} className="p-3 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="mb-3">
        <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="tel" className="form-control" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <button className="btn btn-link p-0" onClick={() => setPage('login')}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
