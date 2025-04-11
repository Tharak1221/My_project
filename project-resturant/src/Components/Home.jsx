
// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// import AppNavbar from "./Navbar";
// import Footer from "./Footer";

// const Home = ({ setUser, setPage }) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setLocalUser] = useState(null);
//   const [activeSection, setActiveSection] = useState(
//     localStorage.getItem("selectedMenu") || "home"
//   );

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
//       .get("http://localhost:5000/api/user/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setLocalUser(response.data.data);
//         setUser(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user details:", error);
//         localStorage.removeItem("token");
//         setPage("login");
//       });
//   }, [setPage, setUser]);

//   useEffect(() => {
//     fetchUserDetails();
//     const handleStorageChange = () => {
//       setActiveSection(localStorage.getItem("selectedMenu") || "home");
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [fetchUserDetails]);

//   if (loading) {
//     return <p style={{ marginTop: "100px", textAlign: "center" }}>Loading user details...</p>;
//   }

//   return (
//     <div>
//       <AppNavbar
//         user={user}
//         handleLogout={() => {}}
//         setPage={setPage}
//         setSidebarOpen={() => {}}
//       />

//       {activeSection === "home" && (
//         <Container className="mt-5">
//           <h2>Welcome, {user.name}!</h2>
//           <p>This is your restaurant management dashboard.</p>
//           <p><strong>Role:</strong> {user.roleName || "Not Assigned"}</p>
//           <p><strong>Department:</strong> {user.department || "Not Assigned"}</p>
//         </Container>
//       )}

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

const Home = ({ setUser, setPage }) => {
  const [loading, setLoading] = useState(true);
  const [user, setLocalUser] = useState(null);
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("selectedMenu") || "home"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedMenu");
    setUser(null);
    setPage("login");
  };
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
      .get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setLocalUser(response.data.data);
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("token");
        setPage("login");
      });
  }, [setPage, setUser]);

  useEffect(() => {
    fetchUserDetails();

    const handleStorageChange = () => {
      setActiveSection(localStorage.getItem("selectedMenu") || "home");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchUserDetails]);

  if (loading) {
    return (
      <p style={{ marginTop: "100px", textAlign: "center" }}>
        Loading user details...
      </p>
    );
  }

  return (
    <div>
      <AppNavbar
        user={user}
        handleLogout={handleLogout} 
        setPage={setPage}
        setSidebarOpen={() => {}}
      />

      {activeSection === "home" && (
        <Container className="mt-5">
          {/* <h2>Welcome, {user.name}!</h2>
          <p>This is your restaurant management dashboard.</p>
          <p>
            <strong>Role:</strong> {user.roleName || "Not Assigned"}
          </p>
          <p>
            <strong>Department:</strong> {user.department || "Not Assigned"}
          </p> */}
        </Container>
      )}

      <Footer />
    </div>
  );
};

export default Home;
