import React, { useState, useEffect } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Home = ({ setPage }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setPage("login");
                return;
            }

            const response = await fetch("http://localhost:5000/userdetails", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (data.error) {
                localStorage.removeItem("authToken");
                setPage("login");
            } else {
                setUser(data);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setPage("login");
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand style={{ fontWeight: "bold", color: "White", fontSize: "1.5rem" }}>
                        Restaurant
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {user && (
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="d-flex align-items-center">
                                    <FaUserCircle size={30} className="me-2" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <Dropdown.ItemText><strong>{user.name}</strong></Dropdown.ItemText>
                                    <Dropdown.ItemText>{user.email}</Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Home;
