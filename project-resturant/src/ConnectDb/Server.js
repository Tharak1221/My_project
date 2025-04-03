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

// 📝 Signup API
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

// 📝 Login API
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

// 🛡️ Token Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return errorHandler.forbidden(res, "No token provided");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return errorHandler.unauthorized(res, "Unauthorized: Invalid token");

    req.user = decoded;
    next();
  });
};

// 📝 Get User Details API
app.get("/api/userdetails", verifyToken, (req, res) => {
  db.query("SELECT id, name, username, email, phone FROM userdetails WHERE id = ?", [req.user.id], (err, results) => {
    if (err) return errorHandler.serverError(res, "Database error");
    if (results.length === 0) return errorHandler.notFound(res, "User not found");

    return errorHandler.success(res, "User details retrieved successfully!", results[0], 200);
  });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
