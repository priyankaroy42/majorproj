require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Serve static files from the 'public' folder
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if your MySQL user is different
    password: "0000", // Add your MySQL password
    database: "flower_users",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database ✅");
    }
});

// User Registration Route
app.post("/api/auth/register", async (req, res) => {
    const { username, email, password, icon } = req.body;

    if (!username || !email || !password || !icon) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const [existingUser] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.promise().query(
            "INSERT INTO users (username, email, password, icon) VALUES (?, ?, ?, ?)",
            [username, email, hashedPassword, icon]
        );

        res.status(201).json({ message: "Registration successful! 🎉" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Try again later!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});
