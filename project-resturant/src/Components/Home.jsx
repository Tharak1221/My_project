import React from 'react';
import { Container, Navbar, Nav, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
const HomePage = () => {
  const navigate = useNavigate();
 
  // Function to handle logout: clear any stored auth data and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/Login');
  };
 
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SR Reasturant</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
            <button variant="outline-light"></button>
          </Nav>
        </Container>
      </Navbar>
 
      {/* Main Content */}
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>Welcome SR Reasturant</Card.Title>
            <Card.Text>
              Our system helps you manage student registrations, teacher details, attendance records,
              grades, and more, all in one efficient platform.
            </Card.Text>
           
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
 
export default HomePage;