import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get opportunities by district and domain
router.get("/", async (req, res) => {
  try {
    const { district, domain } = req.query;

    let result;

    if (district && domain) {
      result = await pool.query(
        `SELECT id, type, title, district, domain, link
         FROM opportunities
         WHERE LOWER(district) = LOWER($1)
         AND LOWER(domain) = LOWER($2)
         ORDER BY created_at DESC`,
        [district, domain]
      );
    } else if (district) {
      result = await pool.query(
        `SELECT id, type, title, district, domain, link
         FROM opportunities
         WHERE LOWER(district) = LOWER($1)
         ORDER BY created_at DESC`,
        [district]
      );
    } else if (domain) {
      result = await pool.query(
        `SELECT id, type, title, district, domain, link
         FROM opportunities
         WHERE LOWER(domain) = LOWER($1)
         ORDER BY created_at DESC`,
        [domain]
      );
    } else {
      result = await pool.query(
        `SELECT id, type, title, district, domain, link
         FROM opportunities
         ORDER BY created_at DESC`
      );
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch opportunities"
    });
  }
});

export default router;
