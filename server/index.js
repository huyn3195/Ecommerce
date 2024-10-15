import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Serve static files from the public and React build directories
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/build")));

// API Routes
app.use("/user", userRoutes);

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
