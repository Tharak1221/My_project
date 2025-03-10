import React, { useState } from 'react';
import { Navbar, Nav, Container, Col, Card, Button, Form } from 'react-bootstrap';
import { FaPizzaSlice, FaHamburger, FaFish, FaDrumstickBite, FaIceCream, FaMugHot } from 'react-icons/fa';

const Home = ({ setPage }) => {
  const [selectedSection, setSelectedSection] = useState("Restaurant Details");
  const [selectedFood, setSelectedFood] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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
          <Navbar.Brand style={{ fontWeight: "bold", color: "White", fontSize: "1.5rem" }}>SR Restaurant</Navbar.Brand>
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
          <Button variant="primary" className="w-100 mb-3" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? "Hide Menu" : "Show Menu"}
          </Button>
          {showMenu && (
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

          {/* Food Menu Section */}
          {selectedSection === "Food Menu" && (
            <Card>
              <Card.Body>
                <Card.Title>Food Menu</Card.Title>
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
              </Card.Body>
            </Card>
          )}
        </Col>
      </Container>
    </>
  );
};

export default Home;
