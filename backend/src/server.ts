import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import propertiesRouter from "./routes/properties";
import categoriesRouter from "./routes/categories";
import authRouter from "./routes/auth";
import bookingsRouter from "./routes/bookings";
import messagesRouter from "./routes/messages";

dotenv.config();

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

app.get("/", (req, res) => {
  res.send("KenyaRentals API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
