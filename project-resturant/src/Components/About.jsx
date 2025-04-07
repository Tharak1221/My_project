// About.jsx
import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container style={{ marginTop: "80px", padding: "20px" }}>
      <h2>About Us</h2>
      <p>
        Welcome to our restaurant management dashboard. Here you can manage your restaurant's operations, view detailed reports, and manage roles and staff.
      </p>
      <p>
        Our platform is designed to simplify your daily tasks and improve overall efficiency.
      </p>
    </Container>
  );
};

export default About;
