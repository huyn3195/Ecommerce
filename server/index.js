import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const backendPort = process.env.BACKEND_SERVER;

// Middleware
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  backendPort,
  "https://526e-140-209-96-105.ngrok-free.app",
  // Add your frontend URL when deployed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploads folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/build")));

// API Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);
app.use("/upload", uploadRoutes);

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
