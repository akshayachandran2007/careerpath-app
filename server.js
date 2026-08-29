import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import opportunityRoutes from "./routes/opportunities.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/opportunities", opportunityRoutes);

// serve the frontend
app.use(express.static(path.join(__dirname, "..", "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CareerPath TN server running at http://localhost:${PORT}`);
});
