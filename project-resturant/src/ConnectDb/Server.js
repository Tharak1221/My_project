
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tharak@2001",
  database: "resturant",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Middleware for Token Verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return errorHandler.forbidden(res, "No token provided");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return errorHandler.unauthorized(res, "Unauthorized: Invalid token");
    req.user = decoded;
    next();
  });
};

// 🔐 Signup
app.post("/api/signup", (req, res) => {
  const { name, username, email, password, phone } = req.body;
  if (!name || !username || !email || !password || !phone) {
    return errorHandler.badRequest(res, "All fields are required");
  }

  db.query("SELECT id FROM userdetails WHERE email = ? OR username = ?", [email, username], (err, results) => {
    if (err) return errorHandler.serverError(res, "Database error");
    if (results.length > 0) return errorHandler.badRequest(res, "User already exists");

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return errorHandler.serverError(res, "Error hashing password");

      db.query(
        "INSERT INTO userdetails (name, username, email, password, phone) VALUES (?, ?, ?, ?, ?)",
        [name, username, email, hashedPassword, phone],
        (err) => {
          if (err) return errorHandler.serverError(res, "Error inserting user data");
          return errorHandler.success(res, "Signup successful!", null, 201);
        }
      );
    });
  });
});

// 🔐 Login
app.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return errorHandler.badRequest(res, "All fields are required");
  }

  db.query("SELECT * FROM userdetails WHERE username = ? OR email = ?", [identifier, identifier], (err, results) => {
    if (err) return errorHandler.serverError(res, "Database error");
    if (results.length === 0) return errorHandler.notFound(res, "Invalid username or email");

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return errorHandler.unauthorized(res, "Incorrect password");

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return errorHandler.success(res, "Login successful!", { token, user }, 200);
    });
  });
});

// 👤 Get Current User
app.get("/api/user/me", verifyToken, (req, res) => {
  db.query(
    "SELECT id, name, username, email, phone, roleName, department FROM userdetails WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return errorHandler.serverError(res, "Database error");
      if (results.length === 0) return errorHandler.notFound(res, "User not found");
      return errorHandler.success(res, "User details retrieved successfully!", results[0], 200);
    }
  );
});

// 📋 Get All Users (For Admin Role Assigning)
app.get("/api/userdetails", verifyToken, (req, res) => {
  db.query(
    "SELECT id, name, username, email, phone, roleName, department FROM userdetails",
    (err, results) => {
      if (err) return errorHandler.serverError(res, "Database error");
      return errorHandler.success(res, "User list retrieved successfully", results, 200);
    }
  );
});

// 🧑‍💼 Fetch Assigned Employees
app.get("/api/userdetails", (req, res) => {
  db.query(
    `SELECT id, name, email, roleName, department 
     FROM userdetails 
     WHERE roleName IS NOT NULL AND department IS NOT NULL`,
    (err, results) => {
      if (err) return errorHandler.serverError(res, "Error fetching employees");
      return res.status(200).json({ success: true, data: results });
    }
  );
});

// 📝 Assign Role & Department
app.put("/api/userdetails/:id", (req, res) => {
  const { id } = req.params;
  const { roleName, department } = req.body;
  if (!roleName || !department) return errorHandler.badRequest(res, "Role and department are required");

  db.query(
    "UPDATE userdetails SET roleName = ?, department = ? WHERE id = ?",
    [roleName, department, id],
    (err) => {
      if (err) return errorHandler.serverError(res, "Error updating role assignment");
      return errorHandler.success(res, "Role assigned successfully", null, 200);
    }
  );
});

// 🧾 Fetch Roles
app.get("/api/roles", (req, res) => {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) return errorHandler.serverError(res, "Database error");
    return res.status(200).json({ success: true, data: results });
  });
});

// ➕ Add Role
app.post("/api/roles", (req, res) => {
  const { roleName } = req.body;
  if (!roleName) return errorHandler.badRequest(res, "Role name is required");

  db.query("INSERT INTO roles (roleName) VALUES (?)", [roleName], (err, result) => {
    if (err) return errorHandler.serverError(res, "Error inserting role");
    return errorHandler.success(res, "Role added successfully", { roleID: result.insertId }, 201);
  });
});

// ❌ Delete Role
app.delete("/api/roles/:id", (req, res) => {
  db.query("DELETE FROM roles WHERE roleID = ?", [req.params.id], (err) => {
    if (err) return errorHandler.serverError(res, "Error deleting role");
    return errorHandler.success(res, "Role deleted successfully", null, 200);
  });
});

// 🗑️ Bulk Delete Roles
app.post("/api/roles/bulk-delete", (req, res) => {
  const { roleIDs } = req.body;
  if (!Array.isArray(roleIDs) || roleIDs.length === 0) {
    return errorHandler.badRequest(res, "No roles selected for deletion");
  }

  const placeholders = roleIDs.map(() => "?").join(",");
  db.query(`DELETE FROM roles WHERE roleID IN (${placeholders})`, roleIDs, (err) => {
    if (err) return errorHandler.serverError(res, "Error during bulk deletion");
    return errorHandler.success(res, "Selected roles deleted successfully", null, 200);
  });
});

// 🧾 Fetch Departments
app.get("/api/departments", (req, res) => {
  db.query("SELECT departmentID, departmentName FROM departments", (err, results) => {
    if (err) return errorHandler.serverError(res, "Database error");
    return res.status(200).json({ success: true, data: results });
  });
});

// ➕ Add Department
app.post("/api/departments", (req, res) => {
  const { departmentName } = req.body;
  if (!departmentName) return errorHandler.badRequest(res, "Department name is required");

  db.query("INSERT INTO departments (departmentName) VALUES (?)", [departmentName], (err, result) => {
    if (err) return errorHandler.serverError(res, "Error inserting department");
    return errorHandler.success(res, "Department added successfully", { departmentID: result.insertId }, 201);
  });
});

// ❌ Delete Department
app.delete("/api/departments/:id", (req, res) => {
  db.query("DELETE FROM departments WHERE departmentID = ?", [req.params.id], (err) => {
    if (err) return errorHandler.serverError(res, "Error deleting department");
    return errorHandler.success(res, "Department deleted successfully", null, 200);
  });
});

// 🗑️ Bulk Delete Departments
app.post("/api/departments/bulk-delete", (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return errorHandler.badRequest(res, "No departments selected for deletion");
  }

  const placeholders = ids.map(() => "?").join(",");
  db.query(`DELETE FROM departments WHERE departmentID IN (${placeholders})`, ids, (err) => {
    if (err) return errorHandler.serverError(res, "Error during bulk deletion");
    return errorHandler.success(res, "Selected departments deleted successfully", null, 200);
  });
});

// 🔄 Update Profile (name, phone, username)
app.put("/api/user/update-profile", verifyToken, (req, res) => {
  const { name, phone } = req.body;
  const userId = req.user.id;

  if (!name || !phone ) {
    return errorHandler.badRequest(res, "Name, phone are required");
  }

  db.query(
    "UPDATE userdetails SET name = ?, phone = ? WHERE id = ?",
    [name, phone,  userId],
    (err) => {
      if (err) return errorHandler.serverError(res, "Error updating user profile");
      return errorHandler.success(res, "Profile updated successfully", null, 200);
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
