const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// ✅ MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tharak@2001", // Change if needed
    database: "resturant"
});
 
db.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("✅ Connected to MySQL database.");
});
 
// ✅ Register API - Hash Password
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }
 
    try {
        // 🔒 Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
 
        const sql = "INSERT INTO userdetails (username, password) VALUES (?, ?)";
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.json({ success: true, message: "User registered successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error encrypting password", error });
    }
});
 
// ✅ Login API - Compare Encrypted Password
app.post("/login", (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }
 
    const sql = "SELECT * FROM userdetails WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
 
        if (results.length > 0) {
            const user = results[0];
 
            // 🔒 Compare entered password with stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
 
            if (isMatch) {
                res.json({ success: true, message: "Login successful", user: { id: user.id, username: user.username } });
            } else {
                res.status(401).json({ success: false, message: "Invalid username or password" });
            }
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    });
});
 
// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});