const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to SQLite database (creates file if not exists)
const db = new sqlite3.Database("./student.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");

    // Create student table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS student (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roll_no INTEGER NOT NULL,
        name TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("✅ Student table created or already exists.");
      }
    });
  }
});

// Route to insert a student
app.post("/add-student", (req, res) => {
  const { roll_no, name } = req.body;

  if (!roll_no || !name) {
    return res.status(400).json({ error: "roll_no and name are required." });
  }

  const query = `INSERT INTO student (roll_no, name) VALUES (?, ?)`;
  db.run(query, [roll_no, name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      mes
