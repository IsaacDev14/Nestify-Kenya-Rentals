"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Import routers
const properties_1 = __importDefault(require("./routes/properties"));
const categories_1 = __importDefault(require("./routes/categories"));
const auth_1 = __importDefault(require("./routes/auth"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const messages_1 = __importDefault(require("./routes/messages"));
// Import Supabase client
const supabase_1 = require("./lib/supabase"); // make sure this path is correct
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
// Test Supabase connection
app.get("/test-supabase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.supabase.from("User").select("*");
    if (error)
        return res.status(500).json({ error: error.message });
    res.json({ data });
}));
// Root route
app.get("/", (req, res) => {
    res.send("KenyaRentals API is running");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
