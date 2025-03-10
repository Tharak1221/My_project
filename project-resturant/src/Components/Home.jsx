import React, { useState } from 'react';
import { Navbar, Nav, Container, Col, Card, Button, Form } from 'react-bootstrap';
import { FaPizzaSlice, FaHamburger, FaFish, FaDrumstickBite, FaIceCream, FaMugHot } from 'react-icons/fa';

const Home = ({ setPage }) => {
  const [selectedSection, setSelectedSection] = useState("Restaurant Details");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setPage("login"); // Use setPage instead of navigate
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold", color: "navy", fontSize: "1.5rem" }}>SR Restaurant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="link" className="nav-link text-light" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-4 d-flex">
        {/* Sidebar */}
        <Col md={2} className="bg-light p-3 border-end">
          <h5>Menu</h5>
          <Form>
            <ul className="list-unstyled">
              {["Restaurant Details", "Order Management", "Menu Management", "Food Menu"].map((option) => (
                <li key={option}>
                  <Form.Check
                    type="radio"
                    label={option}
                    name="menu-options"
                    checked={selectedSection === option}
                    onChange={() => setSelectedSection(option)}
                  />
                </li>
              ))}
            </ul>
          </Form>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h1 className="text-center mb-4">{selectedSection}</h1>
          {selectedSection === "Food Menu" && (
            <Card>
              <Card.Body>
                <Card.Title>Food Menu</Card.Title>
                <ul className="list-unstyled">
                  <li><FaPizzaSlice /> Pizza</li>
                  <li><FaHamburger /> Burgers</li>
                  <li><FaFish /> Seafood</li>
                  <li><FaDrumstickBite /> Chicken Dishes</li>
                  <li><FaIceCream /> Desserts</li>
                  <li><FaMugHot /> Beverages</li>
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Container>
    </>
  );
};

export default Home;
