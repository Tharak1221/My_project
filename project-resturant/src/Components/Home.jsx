
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// import AppNavbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Home = ({ user, setUser, setPage }) => {
//   const [loading, setLoading] = useState(true);
//   const [selectedRoles, setSelectedRoles] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setPage("login");
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;

//     if (decodedToken.exp < currentTime) {
//       localStorage.removeItem("token");
//       setPage("login");
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/userdetails", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setUser(response.data.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//         setPage("login");
//       });
//   }, [setUser, setPage]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setPage("login");
//   };

//   if (loading) {
//     return <p>Loading user details...</p>;
//   }

//   return (
//     <div>
//       <AppNavbar user={user} handleLogout={handleLogout} />
//       <Sidebar selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
//       <Container className="mt-5">
//         <h2>Welcome, {user?.name}!</h2>
//         <p>This is your restaurant management dashboard.</p>
//         <p>Selected Roles: {selectedRoles.join(", ") || "None"}</p>
//         <Button variant="primary" onClick={fetchUserDetails} className="mt-3">
//           Refresh
//         </Button>
//       </Container>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import AppNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = ({ user, setUser, setPage }) => {
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);

 
  const fetchUserDetails = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setPage("login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      setPage("login");
      return;
    }

    axios
      .get("http://localhost:5000/api/userdetails", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setPage("login");
      });
  }, [setUser, setPage]); 

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPage("login");
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <AppNavbar user={user} handleLogout={handleLogout} />
      <Sidebar selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
      <Container className="mt-5">
        <h2>Welcome, {user?.name}!</h2>
        <p>This is your restaurant management dashboard.</p>
        <p>Selected Roles: {selectedRoles.join(", ") || "None"}</p>

        
        <Button variant="primary" onClick={fetchUserDetails} className="mt-3">
          Refresh
        </Button>
      </Container>
    </div>
  );
};

export default Home;
