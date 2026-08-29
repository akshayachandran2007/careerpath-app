import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token required"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token"
      });
    }

    req.user = user;
    next();
  });
}

// Get profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, branch, year, district, domain, cgpa
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
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

// Update profile
router.put("/", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      branch,
      year,
      district,
      domain,
      cgpa
    } = req.body;

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
      [
        name,
        branch,
        year,
        district,
        domain,
        cgpa,
        req.user.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile updated successfully",
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;
