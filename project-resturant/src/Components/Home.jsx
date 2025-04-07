
// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// import AppNavbar from "./Navbar";
// import Footer from "./Footer";
// import { FaSync } from "react-icons/fa";
// // import HomeImage from "./Home.png";

// const Home = ({ user, setUser, setPage }) => {
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const fetchUserDetails = useCallback(() => {
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

//   useEffect(() => {
//     fetchUserDetails();
//   }, [fetchUserDetails]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setPage("login");
//   };

//   if (loading) {
//     return <p>Loading user details...</p>;
//   }

//   return (
//     <div
//       // style={{
//       //   backgroundImage: sidebarOpen ? "none" : `url(${""})`,
//       //   backgroundSize: "cover",
//       //   backgroundPosition: "center",
//       //   backgroundRepeat: "no-repeat",
//       //   minHeight: "100vh",
//       //   width: "100vw",
//       //   display: "flex",
//       //   flexDirection: "column",
//       // }}
//     >
//       <button
//         variant="primary"
//         onClick={fetchUserDetails}
//         style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
//       >
//         <FaSync size={20} />
//       </button>
      
//       <AppNavbar user={user} handleLogout={handleLogout} setPage={setPage} setSidebarOpen={setSidebarOpen} />

//       <Container className="mt-5">
//         <h2>Welcome, {user?.name}!</h2>
//       </Container>
      
//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
// import { FaSync } from "react-icons/fa";

const Home = ({ user, setUser, setPage }) => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    return <p style={{ marginTop: "100px", textAlign: "center" }}>Loading user details...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Navbar */}
      <AppNavbar
        user={user}
        handleLogout={handleLogout}
        setPage={setPage}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Welcome, {user?.name}!</h2>
          {/* <Button variant="outline-primary" onClick={fetchUserDetails}>
            <FaSync className="me-2" />
            Refresh
          </Button> */}
        </div>

        {/* Add your dashboard widgets or sections here */}
        <p>This is your restaurant management dashboard.</p>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
