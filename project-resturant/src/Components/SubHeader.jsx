
// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import ProfileModal from "./ProfileDropdown";

// const SubHeader = ({ user, handleLogout, setSelectedMenu, fetchUser }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [showRoleSubmenu, setShowRoleSubmenu] = useState(false);

//   const handleRefresh = () => {
//     localStorage.setItem("selectedMenu", "home");
//     setSelectedMenu("home");
//   };

//   const handleSaveProfile = () => {
//     if (fetchUser) fetchUser();
//     setShowModal(false);
//   };

//   const handleNavClick = (menu) => {
//     setSelectedMenu(menu);
//     localStorage.setItem("selectedMenu", menu);
//     setShowRoleSubmenu(false);
//   };

//   const toggleRoleSubmenu = () => {
//     setShowRoleSubmenu((prev) => !prev);
//   };

//   const adminMenuItems = [
//     { key: "roles", label: "Roles" },
//     { key: "departments", label: "Departments" },
//     { key: "roleassign", label: "Role Assign" },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".admin-menu-container")) {
//         setShowRoleSubmenu(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"
//       style={{
//         position: "fixed",
//         top: "56px",
//         left: 0,
//         right: 0,
//         zIndex: 999,
//         backgroundColor:  "rgb(156 ,191, 199)",
//       }}
//     >
//       <div className="d-flex align-items-center gap-3">
//         <Button variant="outline-dark" size="sm" onClick={() => handleNavClick("home")}>
//           Home
//         </Button>
//         <Button variant="outline-dark" size="sm" onClick={() => handleNavClick("about")}>
//           About
//         </Button>

//         {/* Admin Menu - Use class for outside click detection */}
//         <div className="position-relative admin-menu-container">
//           <Button variant="outline-dark" size="sm" onClick={toggleRoleSubmenu}>
//             Admin Menu 
//           </Button>
//           {showRoleSubmenu && (
//             <div
//               className="admin-submenu"
//               style={{
//                 position: "absolute",
//                 top: "40px",
//                 left: 0,
//                 backgroundColor: "#fff",
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 padding: "5px 0",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//               }}
//             >
//               {adminMenuItems.map((item) => (
//                 <div
//                   key={item.key}
//                   onClick={() => handleNavClick(item.key)}
//                   style={{
//                     padding: "6px 12px",
//                     cursor: "pointer",
//                     whiteSpace: "nowrap",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
//                   onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                 >
//                   {item.label}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right section with Refresh and Profile */}
//       <div className="d-flex align-items-center gap-2">
//         <Button variant="outline-secondary" size="sm" onClick={handleRefresh}>
//           🔄
//         </Button>
//         <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
//           👤
//         </Button>
//       </div>

//       {/* Profile Modal */}
//       <ProfileModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         user={user}
//         handleLogout={handleLogout}
//         onSave={handleSaveProfile}
//       />
//     </div>
//   );
// };

// export default SubHeader;
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const SubHeader = ({ user, handleLogout, setSelectedMenu, fetchUser }) => {
  const [showRoleSubmenu, setShowRoleSubmenu] = useState(false);

  const handleRefresh = () => {
    localStorage.setItem("selectedMenu", "home");
    setSelectedMenu("home");
  };

  const handleNavClick = (menu) => {
    setSelectedMenu(menu);
    localStorage.setItem("selectedMenu", menu);
    setShowRoleSubmenu(false);
  };

  const toggleRoleSubmenu = () => {
    setShowRoleSubmenu((prev) => !prev);
  };

  const adminMenuItems = [
    { key: "roles", label: "Roles" },
    { key: "departments", label: "Departments" },
    { key: "roleassign", label: "Role Assign" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".admin-menu-container")) {
        setShowRoleSubmenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"
      style={{
        position: "fixed",
        top: "56px",
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "rgb(156, 191, 199)",
      }}
    >
      <div className="d-flex align-items-center gap-3">
      <Button
    style={{ backgroundColor: "#3498db", color: "#fff", border: "none" }}
    size="sm"
    onClick={() => handleNavClick("home")}
  >
    Home
  </Button>

  <Button
    style={{ backgroundColor: "#2ecc71", color: "#fff", border: "none" }}
    size="sm"
    onClick={() => handleNavClick("about")}
  >
    About
  </Button>

  <div className="position-relative admin-menu-container">
    <Button
      style={{ backgroundColor: "#e67e22", color: "#fff", border: "none" }}
      size="sm"
      onClick={toggleRoleSubmenu}
    >
      Admin Menu
    </Button>
          {showRoleSubmenu && (
            <div
              className="admin-submenu"
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "5px 0",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              {adminMenuItems.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section with just refresh */}
      <div className="d-flex align-items-center gap-2">
        <Button variant="outline-secondary" size="sm" onClick={handleRefresh}>
          🔄
        </Button>
      </div>
    </div>
  );
};

export default SubHeader;
