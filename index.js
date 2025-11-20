const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// --- MySQL Connection ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

// Test connection
db.connect((err) => {
    if (err) {
        console.log("DB ERROR:", err);
    } else {
        console.log("MySQL Connected!");
    }
});

// --- Route: Get all users ---
app.get("/users", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Default route
app.get("/", (req, res) => {
    res.send("Backend Working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
