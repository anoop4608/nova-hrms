const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("🚀 Nova HRMS API Running");
});

/* =========================
   DATABASE TEST ROUTE
========================= */

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* =========================
   SAMPLE EMPLOYEE ROUTES
   (You can expand later)
========================= */

// Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM employees ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Add employee
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const result = await db.query(
      `INSERT INTO employees (name, email, department)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, department]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});