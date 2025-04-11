
// // import React, { useEffect, useState, useCallback } from "react";
// // import { Table, Button, Modal, Form } from "react-bootstrap";
// // import axios from "axios";

// // const RoleAssignTable = () => {
// //   const [users, setUsers] = useState([]);
// //   const [roles, setRoles] = useState([]);
// //   const [departments, setDepartments] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [updatedRole, setUpdatedRole] = useState("");
// //   const [updatedDept, setUpdatedDept] = useState("");
// //   const [selectedUsers, setSelectedUsers] = useState([]);

// //   const token = localStorage.getItem("token");

// //   const fetchUsers = useCallback(() => {
// //     axios
// //       .get("http://localhost:5000/api/userdetails", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         const data = res.data?.data;
// //         setUsers(Array.isArray(data) ? data : [data]);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching users", err);
// //       });
// //   }, [token]);

// //   const fetchRoles = useCallback(() => {
// //     axios.get("http://localhost:5000/api/roles").then((res) => {
// //       setRoles(res.data.data);
// //     });
// //   }, []);

// //   const fetchDepartments = useCallback(() => {
// //     axios.get("http://localhost:5000/api/departments").then((res) => {
// //       setDepartments(res.data.data);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     fetchUsers();
// //     fetchRoles();
// //     fetchDepartments();
// //   }, [fetchUsers, fetchRoles, fetchDepartments]);

// //   const handleCheckboxChange = (userId) => {
// //     setSelectedUsers((prev) =>
// //       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
// //     );
// //   };

// //   const handleEdit = (user) => {
// //     setSelectedUser(user);
// //     setUpdatedRole(user.roleName || "");
// //     setUpdatedDept(user.department || "");
// //     setShowModal(true);
// //   };

// //   const handleSave = () => {
// //     if (!updatedRole || !updatedDept) {
// //       return alert("Please select both Role and Department");
// //     }

// //     axios
// //       .put(
// //         `http://localhost:5000/api/userdetails/${selectedUser.id}`,
// //         {
// //           roleName: updatedRole,
// //           department: updatedDept,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then(() => {
// //         setShowModal(false);
// //         fetchUsers();
// //       })
// //       .catch((err) => {
// //         console.error("Error updating user", err);
// //       });
// //   };

// //   const handleDelete = (userId) => {
// //     if (window.confirm("Are you sure you want to remove this user's assignment?")) {
// //       axios
// //         .put(
// //           `http://localhost:5000/api/employees/${userId}`,
// //           {
// //             roleName: null,
// //             department: null,
// //           },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         )
// //         .then(() => {
// //           fetchUsers();
// //         })
// //         .catch((err) => {
// //           console.error("Error removing assignment", err);
// //         });
// //     }
// //   };

// //   return (
// //     <div style={{ marginTop: "80px", padding: "20px" }}>
// //       <h4>Role Assign Table</h4>

// //       <Table striped bordered hover>
// //         <thead>
// //           <tr>
// //             <th>Checkbox</th>
// //             <th>Username / Email</th>
// //             <th>Department</th>
// //             <th>Role</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user.id}>
// //               <td>
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedUsers.includes(user.id)}
// //                   onChange={() => handleCheckboxChange(user.id)}
// //                 />
// //               </td>
// //               <td>{user.name || user.email || "N/A"}</td>
// //               <td>{user.department || "N/A"}</td>
// //               <td>{user.roleName || "N/A"}</td>
// //               <td>
// //                 <Button
// //                   variant="warning"
// //                   size="sm"
// //                   onClick={() => handleEdit(user)}
// //                   className="me-2"
// //                 >
// //                   Edit
// //                 </Button>
// //                 <Button
// //                   variant="danger"
// //                   size="sm"
// //                   onClick={() => handleDelete(user.id)}
// //                 >
// //                   Delete
// //                 </Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>

// //       {/* Edit Modal */}
// //       <Modal show={showModal} onHide={() => setShowModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Assign Role and Department</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Employee</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={selectedUser?.name || selectedUser?.email || "N/A"}
// //                 disabled
// //               />
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label>Role</Form.Label>
// //               <Form.Select
// //                 value={updatedRole}
// //                 onChange={(e) => setUpdatedRole(e.target.value)}
// //               >
// //                 <option value="">Select Role</option>
// //                 {roles.map((role) => (
// //                   <option key={role.roleID} value={role.roleName}>
// //                     {role.roleName}
// //                   </option>
// //                 ))}
// //               </Form.Select>
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label>Department</Form.Label>
// //               <Form.Select
// //                 value={updatedDept}
// //                 onChange={(e) => setUpdatedDept(e.target.value)}
// //               >
// //                 <option value="">Select Department</option>
// //                 {departments.map((dept) => (
// //                   <option key={dept.departmentID} value={dept.departmentName}>
// //                     {dept.departmentName}
// //                   </option>
// //                 ))}
// //               </Form.Select>
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowModal(false)}>
// //             Cancel
// //           </Button>
// //           <Button variant="primary" onClick={handleSave}>
// //             Save
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default RoleAssignTable;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal, Button, Table, Form } from "react-bootstrap";

// const RoleAssignTable = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [updatedRole, setUpdatedRole] = useState("");
//   const [updatedDept, setUpdatedDept] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // 🔄 Fetch users
//   const fetchUsers = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/userdetails", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching users:", err);
//       });
//   };

//   // 🔄 Fetch roles
//   const fetchRoles = () => {
//     axios
//       .get("http://localhost:5000/api/roles")
//       .then((res) => {
//         setRoles(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching roles:", err);
//       });
//   };

//   // 🔄 Fetch departments
//   const fetchDepartments = () => {
//     axios
//       .get("http://localhost:5000/api/departments")
//       .then((res) => {
//         setDepartments(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching departments:", err);
//       });
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchRoles();
//     fetchDepartments();
//   }, []);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setUpdatedRole(user.roleName || "");
//     setUpdatedDept(user.department || "");
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Unauthorized: Please login again.");
//       return;
//     }

//     axios
//       .put(
//         `http://localhost:5000/api/employees/${selectedUser.id}`, // ✅ Fixed URL
//         {
//           roleName: updatedRole,
//           department: updatedDept,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         setShowModal(false);
//         fetchUsers(); // Refresh the table
//       })
//       .catch((error) => {
//         console.error("Update error:", error);
//         alert("Failed to assign role and department. Please try again.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Role Assignment</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Username / Email</th>
//             <th>Role</th>
//             <th>Department</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, idx) => (
//             <tr key={user.id}>
//               <td>{idx + 1}</td>
//               <td>
//                 {user.username} / {user.email}
//               </td>
//               <td>{user.roleName || "Not assigned"}</td>
//               <td>{user.department || "Not assigned"}</td>
//               <td>
//                 <Button variant="primary" size="sm" onClick={() => handleEdit(user)}>
//                   Assign
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Role & Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Employee Name</Form.Label>
//               <Form.Control type="text" value={selectedUser?.name} disabled />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Select Role</Form.Label>
//               <Form.Select value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
//                 <option value="">-- Select Role --</option>
//                 {roles.map((role) => (
//                   <option key={role.roleID} value={role.roleName}>
//                     {role.roleName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Select Department</Form.Label>
//               <Form.Select value={updatedDept} onChange={(e) => setUpdatedDept(e.target.value)}>
//                 <option value="">-- Select Department --</option>
//                 {departments.map((dept) => (
//                   <option key={dept.departmentID} value={dept.departmentName}>
//                     {dept.departmentName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// // export default RoleAssignTable;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";

// const RoleAssignTable = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [updatedRole, setUpdatedRole] = useState("");
//   const [updatedDept, setUpdatedDept] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchUsers = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/userdetails", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching users:", err);
//       });
//   };

//   const fetchRoles = () => {
//     axios
//       .get("http://localhost:5000/api/roles")
//       .then((res) => setRoles(res.data.data))
//       .catch((err) => console.error("Error fetching roles:", err));
//   };

//   const fetchDepartments = () => {
//     axios
//       .get("http://localhost:5000/api/departments")
//       .then((res) => setDepartments(res.data.data))
//       .catch((err) => console.error("Error fetching departments:", err));
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchRoles();
//     fetchDepartments();
//   }, []);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setUpdatedRole(user.roleName || "");
//     setUpdatedDept(user.department || "");
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .put(
//         `http://localhost:5000/api/userdetails/${selectedUser.id}`,
//         { roleName: updatedRole, department: updatedDept },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         setShowModal(false);
//         fetchUsers();
//       })
//       .catch((error) => {
//         console.error("Update error:", error);
//         alert("Failed to update role and department.");
//       });
//   };

//   // 🔍 Filter users by search
//   const filteredUsers = users.filter((user) =>
//     `${user.name} ${user.username} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Role Assignment</h2>

//       {/* 🔎 Search Input */}
//       <InputGroup className="mb-3">
//         <Form.Control
//           placeholder="Search by name, username, or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </InputGroup>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th><Form.Check type="checkbox" disabled /></th>
//             <th>Username</th>
//             <th>Role</th>
//             <th>Department</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user, idx) => (
//               <tr key={user.id}>
//                 <td><Form.Check type="checkbox" /></td>
//                 <td>
//                   {user.username} 
//                 </td>
//                 <td>{user.roleName || "Not assigned"}</td>
//                 <td>{user.department || "Not assigned"}</td>
//                 <td>
//                   <Button variant="primary" size="sm" onClick={() => handleEdit(user)}>
//                     Edit
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

    
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Role & Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Employee Name</Form.Label>
//               <Form.Control type="text" value={selectedUser?.name} disabled />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Select Role</Form.Label>
//               <Form.Select value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
//                 <option value="">-- Select Role --</option>
//                 {roles.map((role) => (
//                   <option key={role.roleID} value={role.roleName}>
//                     {role.roleName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Select Department</Form.Label>
//               <Form.Select value={updatedDept} onChange={(e) => setUpdatedDept(e.target.value)}>
//                 <option value="">-- Select Department --</option>
//                 {departments.map((dept) => (
//                   <option key={dept.departmentID} value={dept.departmentName}>
//                     {dept.departmentName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoleAssignTable;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, InputGroup } from "react-bootstrap";

const RoleAssignTable = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedDept, setUpdatedDept] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch Users with Token
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/userdetails", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        if (err.response?.status === 401) {
          alert("Unauthorized access. Please login again.");
          // Optional: window.location.href = '/login';
        }
      });
  };

  const fetchRoles = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRoles(res.data.data))
      .catch((err) => {
        console.error("Error fetching roles:", err);
      });
  };

  const fetchDepartments = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/departments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDepartments(res.data.data))
      .catch((err) => {
        console.error("Error fetching departments:", err);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchDepartments();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUpdatedRole(user.roleName || "");
    setUpdatedDept(user.department || "");
    setShowModal(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:5000/api/userdetails/${selectedUser.id}`,
        {
          roleName: updatedRole,
          department: updatedDept,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setShowModal(false);
        fetchUsers(); // Refresh table after update
      })
      .catch((error) => {
        console.error("Update error:", error);
        alert("Failed to update role and department.");
      });
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.username} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Role Assignment</h2>

      {/* 🔍 Search Filter */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name, username, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* 📋 Users Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th><Form.Check type="checkbox" disabled /></th>
            <th>Username</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td><Form.Check type="checkbox" /></td>
                <td>{user.username}</td>
                <td>{user.roleName || "Not assigned"}</td>
                <td>{user.department || "Not assigned"}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ✏️ Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role & Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" value={selectedUser?.name || ""} disabled />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
                <option value="">-- Select Role --</option>
                {roles.map((role) => (
                  <option key={role.roleID} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Select Department</Form.Label>
              <Form.Select value={updatedDept} onChange={(e) => setUpdatedDept(e.target.value)}>
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.departmentID} value={dept.departmentName}>
                    {dept.departmentName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleAssignTable;
