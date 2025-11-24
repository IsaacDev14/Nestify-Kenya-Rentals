"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const properties_1 = __importDefault(require("./routes/properties"));
const categories_1 = __importDefault(require("./routes/categories"));
const auth_1 = __importDefault(require("./routes/auth"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const messages_1 = __importDefault(require("./routes/messages"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/properties", properties_1.default);
app.use("/api/categories", categories_1.default);
app.use("/api/bookings", bookings_1.default);
app.use("/api/messages", messages_1.default);
app.get("/", (req, res) => {
    res.send("KenyaRentals API is running");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
