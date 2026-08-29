import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get student profile
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT id, name, email, branch, year, district, domain, cgpa
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

// Update student profile
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, branch, year, district, domain, cgpa } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           branch = $2,
           year = $3,
           district = $4,
           domain = $5,
           cgpa = $6
       WHERE id = $7
       RETURNING id, name, email, branch, year, district, domain, cgpa`,
      [name, branch, year, district, domain, cgpa, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;
