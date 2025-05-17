import type from "./types/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";

dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

export default app;
