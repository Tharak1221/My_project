
// import React, { useState, useEffect } from "react";
// import { Navbar, Container, Button } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";
// import RolesTable from "./RolesTable";
// import DepartmentsTable from "./DepartmentsTable";
// import RoleAssignTable from "./RoleAssignTable";
// import About from "./About";
// import HomePlaceholder from "./HomePlaceholder";
// import SubHeader from "./SubHeader";

// const AppNavbar = ({ user, handleLogout, setSidebarOpen }) => {
//   const [selectedMenu, setSelectedMenu] = useState("home");

//   useEffect(() => {
//     const savedMenu = localStorage.getItem("selectedMenu");
//     setSelectedMenu(savedMenu || "home");
//   }, []);

//   const handleEditProfile = () => {
//     alert("Open edit modal for username & email");
//   };

//   return (
//     <>
//       <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100 px-3 py-2">
//         <Container>
//           <Navbar.Brand className="mx-auto">Restaurant</Navbar.Brand>
//         </Container>
//       </Navbar>

//       <SubHeader
//         user={user}
//         handleLogout={handleLogout}
//         setSelectedMenu={setSelectedMenu}
//         onEdit={handleEditProfile}
//       />

//       <div style={{ paddingTop: "112px" }}>
//         {selectedMenu === "home" && <HomePlaceholder />}
//         {selectedMenu === "roles" && <RolesTable />}
//         {selectedMenu === "departments" && <DepartmentsTable />}
//         {selectedMenu === "roleassign" && <RoleAssignTable />}
//         {selectedMenu === "about" && <About />}
//       </div>
//     </>
//   );
// };

// export default AppNavbar;
import React, { useState, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";

import RolesTable from "./RolesTable";
import DepartmentsTable from "./DepartmentsTable";
import RoleAssignTable from "./RoleAssignTable";
import About from "./About";
import HomePlaceholder from "./HomePlaceholder";
import SubHeader from "./SubHeader";
import ProfileModal from "./ProfileDropdown";

const AppNavbar = ({ user, handleLogout, setSidebarOpen, fetchUser }) => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedMenu = localStorage.getItem("selectedMenu");
    setSelectedMenu(savedMenu || "home");
  }, []);

  const handleSaveProfile = () => {
    if (fetchUser) fetchUser();
    setShowModal(false);
  };

  return (
    <>
      {/* <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100 px-3 py-2" > */}
      <Navbar
  expand="lg"
  fixed="top"
  className="w-100 px-3 py-2"
  style={{
    background: "linear-gradient(to right, #900C3F, #C70039, #FF5733, #FFC300)",
  }}
>

        <Container className="d-flex justify-content-between align-items-center">
          {/* <Navbar.Brand className="mx-auto">Restaurant</Navbar.Brand> */}
          <Navbar.Brand
  className="mx-auto brand-title"
  style={{
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  }}
>
  <span style={{ color: '#e74c3c' }}>R</span>
  <span style={{ color: '#e67e22' }}>e</span>
  <span style={{ color: '#f1c40f' }}>s</span>
  <span style={{ color: '#2ecc71' }}>t</span>
  <span style={{ color: '#1abc9c' }}>a</span>
  <span style={{ color: '#3498db' }}>u</span>
  <span style={{ color: '#9b59b6' }}>r</span>
  <span style={{ color: '#34495e' }}>a</span>
  <span style={{ color: '#16a085' }}>n</span>
  <span style={{ color: '#2980b9' }}>t</span>
</Navbar.Brand>

          <div className="ms-auto d-flex align-items-center">
      <Button
        variant="link"
        onClick={() => setShowModal(true)}
        className="profile-btn"
      >
        👤
      </Button>
    </div>

        </Container>
      </Navbar>

      <SubHeader
        user={user}
        handleLogout={handleLogout}
        setSelectedMenu={setSelectedMenu}
        fetchUser={fetchUser}
      />

      <div style={{ paddingTop: "112px" }}>
        {selectedMenu === "home" && <HomePlaceholder />}
        {selectedMenu === "roles" && <RolesTable />}
        {selectedMenu === "departments" && <DepartmentsTable />}
        {selectedMenu === "roleassign" && <RoleAssignTable />}
        {selectedMenu === "about" && <About />}
      </div>

      {/* Profile Modal */}
      <ProfileModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={user}
        handleLogout={handleLogout}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default AppNavbar;
