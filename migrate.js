import { readFileSync } from "fs";
import { pool } from "./db.js";

const sql = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");

try {
  await pool.query(sql);
  console.log("Schema applied successfully.");
} catch (err) {
  console.error("Migration failed:", err);
} finally {
  await pool.end();
}
