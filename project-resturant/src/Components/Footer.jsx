
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{
        backgroundColor: "#343a40",
        color: "white",
        position: "fixed", 
        bottom: "0", 
        left: "0",
        width: "100%", 
        padding: "10px 0", 
        textAlign: "center",
        zIndex: "1000", 
      }}>
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} Restaurant Dashboard. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
