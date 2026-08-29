import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get opportunities
router.get("/", async (req, res) => {
  try {
    const { district, domain } = req.query;

    let query = `
      SELECT id, type, title, district, domain, link, created_at
      FROM opportunities
    `;

    const values = [];
    const conditions = [];

    if (district) {
      values.push(district);
      conditions.push(`LOWER(district) = LOWER($${values.length})`);
    }

    if (domain) {
      values.push(domain);
      conditions.push(`LOWER(domain) = LOWER($${values.length})`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch opportunities"
    });
  }
});

export default router;
