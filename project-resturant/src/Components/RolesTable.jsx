
// import React, { useEffect, useState } from "react";
// import { Table, Button, FormControl } from "react-bootstrap";
// import axios from "axios";

// const RolesTable = () => {
//   const [roles, setRoles] = useState([]);
//   const [newRoleName, setNewRoleName] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState([]);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/roles");
//       console.log("Fetched roles:", response.data.data);
//       setRoles(response.data.data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       alert("Failed to fetch roles");
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const handleAddRole = async () => {
//     if (!newRoleName.trim()) {
//       return alert("Role name is required");
//     }

//     // try {
//     //   console.log("Sending new role:", newRoleName);
//     //   const res = await axios.post("http://localhost:5000/api/roles", {
//     //     roleName: newRoleName.trim(),
//     //   });

//     //   console.log("Add role response:", res.data);
//     //   setNewRoleName("");
//     //   fetchRoles();
//     // } catch (err) {
//     //   console.error("Add Role Error:", err);
//     //   alert(err.response?.data?.message || "Error adding role");
//     // }
//   };

//   const handleDelete = async (roleID) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/roles/${roleID}`);
//       fetchRoles();
//     } catch (err) {
//       console.error("Delete Role Error:", err);
//       alert(err.response?.data?.message || "Cannot delete role");
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/roles/bulk-delete", {
//         roleIDs: selectedRoles,
//       });
//       setSelectedRoles([]);
//       fetchRoles();
//     } catch (err) {
//       console.error("Bulk Delete Error:", err);
//       alert(err.response?.data?.message || "Cannot delete selected roles");
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedRoles((prev) =>
//       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="p-4 mt-5">
//       <h4>Roles</h4>
//       <div className="d-flex gap-2 mb-3">
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
//         <Button
//           variant="danger"
//           onClick={handleBulkDelete}
//           disabled={!selectedRoles.length}
//         >
//           🗑️ Delete Selected
//         </Button>
//       </div>

//       <Table bordered hover>
//         <thead>
//           <tr>
//             <th>Checkbox</th>
//             <th>Role Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role.roleID}>
//               <td>
//                 <input
//                   type="checkbox"
//                   onChange={() => handleCheckboxChange(role.roleID)}
//                   checked={selectedRoles.includes(role.roleID)}
//                 />
//               </td>
//               <td>{role.roleName}</td>
//               <td>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(role.roleID)}
//                 >
//                   🗑️ Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default RolesTable;
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, FormControl, Form } from "react-bootstrap";
import axios from "axios";

const RolesTable = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
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
    try {
      await axios.post("http://localhost:5000/api/roles", {
        roleName: newRoleName.trim(),
      });
      setNewRoleName("");
      setShowModal(false);
      fetchRoles();
    } catch (err) {
      console.error("Add Role Error:", err);
      alert(err.response?.data?.message || "Error adding role");
    }
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
        <Button variant="success" onClick={() => setShowModal(true)}>
          ➕ 
        </Button>
        
        <Button
          variant="danger"
          onClick={handleBulkDelete}
          disabled={!selectedRoles.length}
        >
          🗑️ 
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
          {roles.map((role) => {
            return (
              <tr key={role.roleID}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(role.roleID)}
                    checked={selectedRoles.includes(role.roleID)} />
                </td>
                <td>{role.roleName}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(role.roleID)}
                  >
                    🗑️ 
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal for Adding Role */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RolesTable;
