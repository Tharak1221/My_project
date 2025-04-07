
// import React, { useState ,useEffect} from "react";
// import { Table, Button, FormControl, Form } from "react-bootstrap";
// import axios from "axios";
// const RolesTable = () => {
//   // Sample initial roles
//   const initialRoles = [
//     // { id: 1, name: "Admin" },
//     // { id: 2, name: "Manager" },
//     // { id: 3, name: "Staff" },
//   ];

//   const [roles, setRoles] = useState(initialRoles);
//   const [newRoleName, setNewRoleName] = useState(""); // Role input field
//   const [editingRoleId, setEditingRoleId] = useState(null);
//   const [editedRoleName, setEditedRoleName] = useState("");

//   // Add a new role manuall
//   const handleAddRole = () => {
//     if (!newRoleName.trim()) {
//       alert("Role name cannot be empty!");
//       return;
//     }

//     if (roles.some(role => role.name.toLowerCase() === newRoleName.toLowerCase())) {
//       alert("Role name already exists!");
//       return;
//     }

//     const newRole = {
//       id: roles.length > 0 ? roles[roles.length - 1].id + 1 : 1, // Increment ID
//       name: newRoleName.trim(),
//     };

//     setRoles([...roles, newRole]);
//     setNewRoleName(""); // Clear input field after adding
//   };

//   // Delete a role
//   const handleDelete = (id) => {
//     setRoles(roles.filter((role) => role.id !== id));
//   };

//   // Edit a role
//   const handleEdit = (role) => {
//     setEditingRoleId(role.id);
//     setEditedRoleName(role.name);
//   };

//   // Save the edited role
//   const handleSave = (id) => {
//     if (!editedRoleName.trim()) {
//       alert("Role name cannot be empty!");
//       return;
//     }

//     setRoles(
//       roles.map((role) =>
//         role.id === id ? { ...role, name: editedRoleName.trim() } : role
//       )
//     );
//     setEditingRoleId(null);
//     setEditedRoleName("");
//   };

//   // Cancel editing
//   const handleCancel = () => {
//     setEditingRoleId(null);
//     setEditedRoleName("");
//   };

//   // Refresh table data (reset to initial roles)
//   const handleRefresh = () => {
//     setRoles(initialRoles);
//     setEditingRoleId(null);
//     setEditedRoleName("");
//   };
//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/roles");
//       setRoles(response.data.data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
//   };

//   // 📌 Fetch Roles on Component Mount
//   useEffect(() => {
//     fetchRoles();
//   }, []);
//   return (
//     <div style={{ marginTop: "80px", padding: "20px" }}>
//       <h4>Roles Table</h4>
      
//       {/* Add Role Input and Button */}
//       <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
//         <FormControl
//           type="text"
//           placeholder="Enter role name"
//           value={newRoleName}
//           onChange={(e) => setNewRoleName(e.target.value)}
//           style={{ width: "200px" }}
//         />
//         <Button variant="success" onClick={handleAddRole}>
//           ➕ Add Role
//         </Button>
//         <Button variant="info" onClick={handleRefresh}>
//           🔄 Refresh
//         </Button>
//       </div>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Checkbox</th>
//             <th>Role ID</th>
//             <th>Role Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role.id}>
//               <td>
//                 <input type="checkbox" />
//               </td>
//               <td>{role.id}</td>
//               <td>
//                 {editingRoleId === role.id ? (
//                   <FormControl
//                     type="text"
//                     value={editedRoleName}
//                     onChange={(e) => setEditedRoleName(e.target.value)}
//                   />
//                 ) : (
//                   role.name
//                 )}
//               </td>
//               <td>
//                 {editingRoleId === role.id ? (
//                   <>
//                     <Button
//                       variant="success"
//                       size="sm"
//                       onClick={() => handleSave(role.id)}
//                     >
//                       Save
//                     </Button>{" "}
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => handleEdit(role)}
//                     >
//                       Edit
//                     </Button>{" "}
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(role.id)}
//                     >
//                       Delete
//                     </Button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default RolesTable;


// RolesTable.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import axios from "axios";

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
      console.log("Fetched roles:", response.data.data);
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      return alert("Role name is required");
    }

    // try {
    //   console.log("Sending new role:", newRoleName);
    //   const res = await axios.post("http://localhost:5000/api/roles", {
    //     roleName: newRoleName.trim(),
    //   });

    //   console.log("Add role response:", res.data);
    //   setNewRoleName("");
    //   fetchRoles();
    // } catch (err) {
    //   console.error("Add Role Error:", err);
    //   alert(err.response?.data?.message || "Error adding role");
    // }
  };

  const handleDelete = async (roleID) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${roleID}`);
      fetchRoles();
    } catch (err) {
      console.error("Delete Role Error:", err);
      alert(err.response?.data?.message || "Cannot delete role");
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post("http://localhost:5000/api/roles/bulk-delete", {
        roleIDs: selectedRoles,
      });
      setSelectedRoles([]);
      fetchRoles();
    } catch (err) {
      console.error("Bulk Delete Error:", err);
      alert(err.response?.data?.message || "Cannot delete selected roles");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 mt-5">
      <h4>Roles</h4>
      <div className="d-flex gap-2 mb-3">
        <FormControl
          type="text"
          placeholder="Enter role name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          style={{ width: "200px" }}
        />
        <Button variant="success" onClick={handleAddRole}>
          ➕ Add Role
        </Button>
        <Button
          variant="danger"
          onClick={handleBulkDelete}
          disabled={!selectedRoles.length}
        >
          🗑️ Delete Selected
        </Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.roleID}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(role.roleID)}
                  checked={selectedRoles.includes(role.roleID)}
                />
              </td>
              <td>{role.roleName}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(role.roleID)}
                >
                  🗑️ Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RolesTable;
