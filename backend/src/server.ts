import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routers
import propertiesRouter from "./routes/properties";
import categoriesRouter from "./routes/categories";
import authRouter from "./routes/auth";
import bookingsRouter from "./routes/bookings";
import messagesRouter from "./routes/messages";

// Import Supabase client
import { supabase } from "./lib/supabase";  // make sure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/messages", messagesRouter);

// Test Supabase connection
app.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase.from("User").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

// Root route
app.get("/", (req, res) => {
  res.send("KenyaRentals API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
