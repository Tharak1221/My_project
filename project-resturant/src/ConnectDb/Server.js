// // const express = require("express");
// // const mysql = require("mysql2");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");
// // const bcrypt = require("bcrypt");
 
// // const app = express();
// // const PORT = 5000;
 
// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
 
// // // MySQL Connection
// // const db = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "Tharak@2001",
// //   database: "resturant",
// // });
 
// // db.connect((err) => {
// //   if (err) {
// //     console.error("Error connecting to the database:", err);
// //     return;
// //   }
// //   console.log("Connected to the MySQL database.");
// // });
 
// // // ✅ Signup Endpoint - Insert User with Hashed Password
// // app.post("/api/signup", async (req, res) => {
// //   const { name, username, email, password, phone } = req.body;
 
// //   if (!name || !username || !email || !password || !phone) {
// //     return res.status(400).json({ message: "All fields are required" });
// //   }
 
// //   try {
// //     // Check if user already exists
// //     const checkUserSql = "SELECT * FROM userdetails WHERE email = ? OR username = ?";
// //     db.query(checkUserSql, [email, username], async (err, results) => {
// //       if (err) return res.status(500).json({ error: "Error checking user" });
// //       if (results.length > 0) return res.status(400).json({ message: "User already exists" });
 
// //       // Hash the password and insert
// //       const hashedPassword = await bcrypt.hash(password, 10);
// //       const sql = "INSERT INTO userdetails (name, username, email, password, phone) VALUES (?, ?, ?, ?, ?)";
// //       const values = [name, username, email, hashedPassword, phone];
 
// //       db.query(sql, values, (err, result) => {
// //         if (err) {
// //           console.error("Error inserting data:", err);
// //           return res.status(500).send(err);
// //         }
// //         res.status(200).json({ message: "Signup successful!" });
// //       });
// //     });
// //   } catch (error) {
// //     console.error("Error during signup:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });
 
// // // ✅ Login Endpoint - Verify User Credentials
// // app.post("/api/login", (req, res) => {
// //   const { identifier, password } = req.body;
 
// //   if (!identifier || !password) {
// //     return res.status(400).json({ message: "All fields are required" });
// //   }
 
// //   const sql = "SELECT * FROM userdetailsWHERE username = ? OR email = ?";
// //   db.query(sql, [identifier, identifier], async (err, results) => {
// //     if (err) return res.status(500).json({ error: "Internal server error" });
// //     if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });
 
// //     const user = results[0];
// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (isPasswordValid) {
// //       res.status(200).json({ message: "Login successful!", user });
// //     } else {
// //       res.status(401).json({ message: "Invalid credentials" });
// //     }
// //   });
// // });
 
// // // Start Server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
 
// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL Database Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Tharak@2001",
//   database: "resturant",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("✅ Connected to the MySQL database.");
// });

// // ✅ Signup Endpoint - Insert User with Hashed Password
// app.post("/api/signup", async (req, res) => {
//   const { name, username, email, password, phone } = req.body;

//   if (!name || !username || !email || !password || !phone) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if user already exists
//     const checkUserSql = "SELECT * FROM userdetails WHERE email = ? OR username = ?";
//     db.query(checkUserSql, [email, username], async (err, results) => {
//       if (err) return res.status(500).json({ error: "Error checking user" });
//       if (results.length > 0) return res.status(400).json({ message: "User already exists" });

//       // Hash the password and insert user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const sql = "INSERT INTO userdetails (name, username, email, password, phone) VALUES (?, ?, ?, ?, ?)";
//       const values = [name, username, email, hashedPassword, phone];

//       db.query(sql, values, (err, result) => {
//         if (err) {
//           console.error("Error inserting data:", err);
//           return res.status(500).send(err);
//         }
//         res.status(200).json({ message: "Signup successful!" });
//       });
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // ✅ Login Endpoint - Verify User Credentials
// app.post("/api/login", (req, res) => {
//   const { identifier, password } = req.body;

//   if (!identifier || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "SELECT * FROM userdetails WHERE username = ? OR email = ?";
//   db.query(sql, [identifier, identifier], async (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid username or email" });
//     }

//     const user = results[0];

//     try {
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: "Incorrect password" });
//       }

//       // ✅ Send only necessary user details (excluding password)
//       const { id, name, username, email, phone } = user;
//       res.status(200).json({
//         success: true,
//         message: "Login successful!",
//         user: { id, name, username, email, phone }
//       });

//     } catch (error) {
//       console.error("Error during login:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Replace with a strong secret

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tharak@2001",
  database: "resturant",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("✅ Connected to the MySQL database.");
});

// ✅ Signup Endpoint - Insert User with Hashed Password
app.post("/api/signup", async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  if (!name || !username || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const checkUserSql = "SELECT * FROM userdetails WHERE email = ? OR username = ?";
    db.query(checkUserSql, [email, username], async (err, results) => {
      if (err) return res.status(500).json({ error: "Error checking user" });
      if (results.length > 0) return res.status(400).json({ message: "User already exists" });

      // Hash the password and insert user
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO userdetails (name, username, email, password, phone) VALUES (?, ?, ?, ?, ?)";
      const values = [name, username, email, hashedPassword, phone];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send(err);
        }
        res.status(200).json({ message: "Signup successful!" });
      });
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Login Endpoint - Generate JWT Token
app.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM userdetails WHERE username = ? OR email = ?";
  db.query(sql, [identifier, identifier], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    const user = results[0];

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // ✅ Generate JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email }, 
        SECRET_KEY, 
        { expiresIn: "5s" } 
      );

      // ✅ Send Token with User Details (Exclude Password)
      const { id, name, username, email, phone } = user;
      res.status(200).json({
        success: true,
        message: "Login successful!",
        token,  // Send token to frontend
        user: { id, name, username, email, phone }
      });

    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

// ✅ JWT Middleware to Protect Routes
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};

// ✅ Protected Route Example: Fetch User Details
app.get("/api/userdetails", verifyToken, (req, res) => {
  const userId = req.user.id; // Get user ID from token

  const sql = "SELECT id, name, username, email, phone FROM userdetails WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(results[0]);
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
