import React, { useEffect, useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import axios from "axios";

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [selected, setSelected] = useState([]);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartments(res.data.data);
    } catch (err) {
      console.error("Error fetching departments", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) return alert("Department name cannot be empty");
    try {
      await axios.post("http://localhost:5000/api/departments", {
        departmentName: newDepartment.trim(),
      });
      setNewDepartment("");
      fetchDepartments();
    } catch (err) {
      console.error("Error adding department", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      alert("Cannot delete department assigned to an employee");
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post("http://localhost:5000/api/departments/bulk-delete", {
        ids: selected,
      });
      setSelected([]);
      fetchDepartments();
    } catch (err) {
      alert("Cannot delete one or more departments assigned to employees");
    }
  };

  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h4>Departments Table</h4>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <FormControl
          type="text"
          placeholder="Enter department name"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          style={{ width: "200px" }}
        />
        <Button variant="success" onClick={handleAddDepartment}>
          ➕ Add Department
        </Button>
        {selected.length > 0 && (
          <Button variant="danger" onClick={handleBulkDelete}>
            🗑️ Delete Selected
          </Button>
        )}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(dept.id)}
                  onChange={() => handleCheckboxChange(dept.id)}
                />
              </td>
              <td>{dept.name}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(dept.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentsTable;
