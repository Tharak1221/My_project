import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

const Sidebar = ({ selectedRoles, setSelectedRoles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <Button variant="dark" onClick={toggleSidebar} className="mb-3">
        <FaBars /> Roles
      </Button>

      {/* Sidebar Menu */}
      <div
        style={{
          width: isOpen ? "200px" : "0",
          transition: "0.3s",
          overflow: "hidden",
          backgroundColor: "#343a40",
          padding: isOpen ? "15px" : "0",
          position: "fixed",
          left: "0",
          top: "50px",
          height: "100vh",
          color: "white",
        }}
      >
        <h5>Select Roles</h5>
        <Form>
          {["Admin", "Manager", "Staff"].map((role) => (
            <Form.Check
              key={role}
              type="checkbox"
              label={role}
              checked={selectedRoles.includes(role)}
              onChange={() => handleRoleChange(role)}
              className="mb-2"
            />
          ))}
        </Form>
      </div>
    </div>
  );
};

export default Sidebar;
