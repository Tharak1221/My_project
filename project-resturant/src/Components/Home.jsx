import React, { useState } from 'react';
import { Navbar, Nav, Container, Col, Button, Form } from 'react-bootstrap';
import { FaPizzaSlice, FaHamburger, FaFish, FaDrumstickBite, FaIceCream, FaMugHot } from 'react-icons/fa';

const Home = ({ setPage }) => {
  const [selectedSection, setSelectedSection] = useState("Restaurant Details");
  const [selectedFood, setSelectedFood] = useState("");
  const [Menu, setMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setPage("login"); 
  };

  const handleFoodSelection = (event) => {
    setSelectedFood(event.target.value);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold", color: "White", fontSize: "1.5rem", backgroundColor: "darkblue" }}>SR Restaurant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="link" className="nav-link text-light" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container fluid className="mt-4 d-flex">
        {/* Sidebar */}
        <Col md={2} className="bg-light p-3 border-end">
          <Button variant="primary" className="w-100 mb-3" onClick={() => setMenu(!Menu)}>
            {Menu ? "Hide Menu" : "Menu"}
          </Button>
          {Menu && (
            <Form>
              <ul className="list-unstyled">
                {["Restaurant Details", "Order Management", "Menu Management", "Food Menu"].map((option) => (
                  <li key={option}>
                    <input
                      type="radio"
                      name="menu-options"
                      checked={selectedSection === option}
                      onChange={() => setSelectedSection(option)}
                    /> {option}
                  </li>
                ))}
              </ul>
            </Form>
          )}
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h1 className="text-center mb-4">{selectedSection}</h1>

          {/* Food Menu Section (Without Card) */}
          {selectedSection === "Food Menu" && (
            <div className="p-4 border rounded bg-light">
              <h3>Food Menu</h3>
              <div>
                {[
                  { icon: <FaPizzaSlice />, name: "Pizza" },
                  { icon: <FaHamburger />, name: "Burgers" },
                  { icon: <FaFish />, name: "Seafood" },
                  { icon: <FaDrumstickBite />, name: "Chicken Dishes" },
                  { icon: <FaIceCream />, name: "Desserts" },
                  { icon: <FaMugHot />, name: "Beverages" }
                ].map((item) => (
                  <div key={item.name} className="mb-2">
                    <input 
                      type="radio" 
                      name="food" 
                      value={item.name} 
                      checked={selectedFood === item.name} 
                      onChange={handleFoodSelection} 
                    /> {item.icon} {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Container>
    </>
  );
};

export default Home;
