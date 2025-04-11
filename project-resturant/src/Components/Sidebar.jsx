// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import RolesTable from "./RolesTable";

// const Sidebar = ({ selectedRoles, setSelectedRoles }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showTable, setShowTable] = useState(false); // Track table visibility

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleRoleClick = (role) => {
//     if (role === "Admin") {
//       setShowTable(true); // Show table when clicking "Admin"
//     }
//   };

//   return (
//     <div>
//       {/* Sidebar Toggle Button */}
//       {/* <button
//         style={{ backgroundColor: "black", color: "white", padding: "5px 10px" }}
//         onClick={toggleSidebar}
//       >
//         Roles
//       </button> */}

//       {/* Sidebar Menu */}
//       <div
//         style={{
//           width: isOpen ? "200px" : "0",
//           transition: "0.3s",
//           overflow: "hidden",
//           backgroundColor: "#343a40",
//           padding: isOpen ? "15px" : "0",
//           position: "fixed",
//           left: "0",
//           top: "50px",
//           height: "100vh",
//           color: "white",
//         }}
//       >
//         {isOpen && (
//           <>
//             <h5>Select Roles</h5>
//             <Form>
//               {["Admin", "Manager", "Staff"].map((role) => (
//                 <p
//                   key={role}
//                   style={{
//                     cursor: "pointer",
//                     padding: "8px",
//                     backgroundColor: showTable && role === "Admin" ? "#007bff" : "transparent",
//                     color: showTable && role === "Admin" ? "white" : "inherit",
//                   }}
//                   onClick={() => handleRoleClick(role)}
//                 >
//                   {role}
//                 </p>
//               ))}
//             </Form>
//           </>
//         )}
//       </div>

//       {/* Render RolesTable only when "Admin" is clicked */}
//       {showTable && <RolesTable />}
//     </div>
//   );
// };

// export default Sidebar;
