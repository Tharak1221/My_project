
// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form } from "react-bootstrap";
// import axios from "axios";

// const RoleAssignTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [updatedRole, setUpdatedRole] = useState("");
//   const [updatedDept, setUpdatedDept] = useState("");

//   // Fetch data
//   useEffect(() => {
//     fetchEmployees();
//     fetchRoles();
//     fetchDepartments();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/employees");
//       setEmployees(response.data);
//     } catch (err) {
//       console.error("Failed to fetch employees", err);
//     }
//   };

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/roles");
//       setRoles(response.data.data);
//     } catch (err) {
//       console.error("Failed to fetch roles", err);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/departments");
//       setDepartments(response.data.data);
//     } catch (err) {
//       console.error("Failed to fetch departments", err);
//     }
//   };

//   const handleEdit = (employee) => {
//     setSelectedEmployee(employee);
//     setUpdatedRole(employee.roleName);
//     setUpdatedDept(employee.department);
//     setShowModal(true);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/employees/${selectedEmployee.id}`, {
//         roleName: updatedRole,
//         department: updatedDept,
//       });
//       setShowModal(false);
//       fetchEmployees(); // Refresh data
//     } catch (err) {
//       console.error("Failed to update employee", err);
//     }
//   };

//   return (
//     <div style={{ marginTop: "80px", padding: "20px" }}>
//       <h4>Role Assign Table</h4>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Checkbox</th>
//             <th>Username / Email</th>
//             <th>Department</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp.id}>
//               <td><input type="checkbox" /></td>
//               <td>{emp.name || emp.email}</td>
//               <td>{emp.department}</td>
//               <td>{emp.roleName}</td>
//               <td>
//                 <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>
//                   Edit
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Role and Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Employee</Form.Label>
//               <Form.Control type="text" value={selectedEmployee?.name} disabled />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Role</Form.Label>
//               <Form.Select value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
//                 <option value="">Select Role</option>
//                 {roles.map((role) => (
//                   <option key={role.roleID} value={role.roleName}>{role.roleName}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Department</Form.Label>
//               <Form.Select value={updatedDept} onChange={(e) => setUpdatedDept(e.target.value)}>
//                 <option value="">Select Department</option>
//                 {departments.map((dept) => (
//                   <option key={dept.departmentID} value={dept.departmentName}>{dept.departmentName}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSave}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default RoleAssignTable;
import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const RoleAssignTable = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedDept, setUpdatedDept] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(() => {
    axios
      .get("http://localhost:5000/api/userdetails", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data?.data;
        setUsers(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      });
  }, [token]);

  const fetchRoles = useCallback(() => {
    axios.get("http://localhost:5000/api/roles").then((res) => {
      setRoles(res.data.data);
    });
  }, []);

  const fetchDepartments = useCallback(() => {
    axios.get("http://localhost:5000/api/departments").then((res) => {
      setDepartments(res.data.data);
    });
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchDepartments();
  }, [fetchUsers, fetchRoles, fetchDepartments]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUpdatedRole(user.roleName || "");
    setUpdatedDept(user.department || "");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!updatedRole || !updatedDept) {
      return alert("Please select both Role and Department");
    }

    axios
      .put(
        `http://localhost:5000/api/userdetails/${selectedUser.id}`,
        {
          roleName: updatedRole,
          department: updatedDept,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setShowModal(false);
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error updating user", err);
      });
  };

  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h4>Role Assign Table</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Username / Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.name || user.email || "N/A"}</td>
              <td>{user.department || "N/A"}</td>
              <td>{user.roleName || "N/A"}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role and Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || selectedUser?.email || "N/A"}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.roleID} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                value={updatedDept}
                onChange={(e) => setUpdatedDept(e.target.value)}
              >
                <option value="">Select Department</option>
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
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleAssignTable;
