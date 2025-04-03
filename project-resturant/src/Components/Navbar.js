import React from "react";
import { Navbar, Container } from "react-bootstrap";
import ProfileDropdown from "./ProfileDropdown";

const AppNavbar = ({ user, handleLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Restaurant Dashboard</Navbar.Brand>
        <ProfileDropdown user={user} handleLogout={handleLogout} />
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
