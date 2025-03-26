
import React from "react";
import { Navbar, Nav, Dropdown, Container, Button } from "react-bootstrap";
import {  FaUserCircle } from 'react-icons/fa';

const Home = ({ user, setPage }) => {
  const handleLogout = () => {
    setPage("login");
     // ✅ Redirect to Login on logout
  };

  return (
    <div>
      {/* ✅ Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Restaurant Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown>

              <Dropdown.Toggle variant="secondary" id="profile-dropdown">
              <FaUserCircle style={{ marginRight: '8px' }} />{user?.username || "Profile"}           
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item disabled><strong>{user?.name}</strong></Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item>Username: {user?.username}</Dropdown.Item>
                <Dropdown.Item>Email: {user?.email}</Dropdown.Item>
                <Dropdown.Item>Phone: {user?.phone}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* ✅ Dashboard Content */}
      <Container className="mt-5">
        <h2>Welcome, {user?.name}!</h2>
        <p>This is your restaurant management dashboard.</p>
        {/* Add more dashboard features here */}
      </Container>
    </div>
  );
};

export default Home;
