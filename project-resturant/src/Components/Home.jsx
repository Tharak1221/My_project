
// import React, { useEffect } from "react";
// import { Navbar, Nav, Dropdown, Container, Button } from "react-bootstrap";
// import {  FaUserCircle } from 'react-icons/fa';
// import {jwtDecode} from "jwt-decode";

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000; // Convert to seconds

//     if (decodedToken.exp < currentTime) {
//       // Token expired
//       alert("Session expired. Please log in again.");
//       localStorage.removeItem("token"); // Remove expired token
//       setPage("/login"); // Redirect to login page
//     }
//   } else {
//     // No token found, redirect to login
//     setPage("/login");
//   }
// }, [setPage]);
// const Home = ({ user, setPage }) => {
//   const handleLogout = () => {
//     setPage("login");
//      // ✅ Redirect to Login on logout
//   };

//   return (
//     <div>
     
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand>Restaurant Dashboard</Navbar.Brand>
//           <Nav className="ms-auto">
//             <Dropdown>

//               <Dropdown.Toggle variant="secondary" id="profile-dropdown">
//               <FaUserCircle style={{ marginRight: '8px' }} />{user?.username || "Profile"}           
//               </Dropdown.Toggle>
//               <Dropdown.Menu align="end">
//                 <Dropdown.Item disabled><strong>{user?.name}</strong></Dropdown.Item>
                
//                 <Dropdown.Divider />
                
//                 <Dropdown.Item>Username: {user?.username}</Dropdown.Item>
//                 <Dropdown.Item>Email: {user?.email}</Dropdown.Item>
//                 <Dropdown.Item>Phone: {user?.phone}</Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item>
//                   <Button variant="danger" size="sm" onClick={handleLogout}>Logout</Button>
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* ✅ Dashboard Content */}
//       <Container className="mt-5">
//         <h2>Welcome, {user?.name}!</h2>
//         <p>This is your restaurant management dashboard.</p>
//         {/* Add more dashboard features here */}
//       </Container>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { Navbar, Nav, Dropdown, Container, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Home = ({ user, setPage }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp < currentTime) {
        // Token expired
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Remove expired token
        setPage("login"); // Redirect to login page
      }
    } else {
      // No token found, redirect to login
      setPage("login");
    }
  }, [setPage]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    setPage("login"); // ✅ Redirect to Login on logout
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Restaurant Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="profile-dropdown">
                <FaUserCircle style={{ marginRight: "8px" }} />
                {user?.username || "Profile"}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item disabled>
                  <strong>{user?.name}</strong>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Username: {user?.username}</Dropdown.Item>
                <Dropdown.Item>Email: {user?.email}</Dropdown.Item>
                <Dropdown.Item>Phone: {user?.phone}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

     
      <Container className="mt-5">
        <h2>Welcome, {user?.name}!</h2>
        <p>This is your restaurant management dashboard.</p>
       
      </Container>
    </div>
  );
};

export default Home;
