import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState("Restaurant Details");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand style={{ fontWeight: "bold", color: "red", fontSize: "3 rem" }}>SR Restaurant</Navbar.Brand>
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
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Restaurant Details"
                                    name="menu-options"
                                    checked={selectedSection === "Restaurant Details"}
                                    onChange={() => setSelectedSection("Restaurant Details")}
                                />
                            </li>
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Order Management"
                                    name="menu-options"
                                    checked={selectedSection === "Order Management"}
                                    onChange={() => setSelectedSection("Order Management")}
                                />
                            </li>
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Menu Management"
                                    name="menu-options"
                                    checked={selectedSection === "Menu Management"}
                                    onChange={() => setSelectedSection("Menu Management")}
                                />
                            </li>
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Table Reservations"
                                    name="menu-options"
                                    checked={selectedSection === "Table Reservations"}
                                    onChange={() => setSelectedSection("Table Reservations")}
                                />
                            </li>
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Staff Management"
                                    name="menu-options"
                                    checked={selectedSection === "Staff Management"}
                                    onChange={() => setSelectedSection("Staff Management")}
                                />
                            </li>
                            <li>
                                <Form.Check
                                    type="radio"
                                    label="Customer Feedback"
                                    name="menu-options"
                                    checked={selectedSection === "Customer Feedback"}
                                    onChange={() => setSelectedSection("Customer Feedback")}
                                />
                            </li>
                        </ul>
                    </Form>
                </Col>

                {/* Main Content */}
                <Col md={10} className="p-4">
                    <h1 className="text-center mb-4">{selectedSection}</h1>
                    {selectedSection === "Restaurant Details" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Restaurant Details</Card.Title>
                                <Card.Text>Manage restaurant information like address, contact, and images.</Card.Text>
                                <Link to="/restaurant-details"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSection === "Order Management" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Order Management</Card.Title>
                                <Card.Text>View and update customer orders and their status.</Card.Text>
                                <Link to="/orders"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSection === "Menu Management" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Menu Management</Card.Title>
                                <Card.Text>Add, update, and remove menu items with categories.</Card.Text>
                                <Link to="/menu"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSection === "Table Reservations" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Table Reservations</Card.Title>
                                <Card.Text>Manage table bookings and availability.</Card.Text>
                                <Link to="/reservations"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSection === "Staff Management" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Staff Management</Card.Title>
                                <Card.Text>Manage restaurant staff details and shift scheduling.</Card.Text>
                                <Link to="/staff"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                    {selectedSection === "Customer Feedback" && (
                        <Card>
                            <Card.Body>
                                <Card.Title>Customer Feedback</Card.Title>
                                <Card.Text>View and respond to customer reviews and ratings.</Card.Text>
                                <Link to="/feedback"><Button variant="primary">Manage</Button></Link>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Container>
        </>
    );
};

export default Home;
