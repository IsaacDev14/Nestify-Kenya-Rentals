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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const router = (0, express_1.Router)();
// Create a new booking
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId, checkIn, checkOut, guests, total, userId } = req.body;
    try {
        const { data: booking, error } = yield supabase_1.supabase
            .from('Booking')
            .insert([
            {
                propertyId,
                startDate: new Date(checkIn),
                endDate: new Date(checkOut),
                userId: userId || 1, // Default to user 1 if not provided (for now)
                // guests and total might need to be added to schema if not present
            }
        ])
            .select()
            .single();
        if (error)
            throw error;
        res.status(201).json({
            success: true,
            booking
        });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
}));
// Get all bookings
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: bookings, error } = yield supabase_1.supabase
            .from('Booking')
            .select('*, property:Property(*), user:User(*)');
        if (error)
            throw error;
        res.json(bookings);
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
}));
// Get booking by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { data: booking, error } = yield supabase_1.supabase
            .from('Booking')
            .select('*, property:Property(*), user:User(*)')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    }
    catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ error: "Failed to fetch booking" });
    }
}));
// Cancel booking (Delete)
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { error } = yield supabase_1.supabase
            .from('Booking')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
        res.json({
            success: true,
            message: "Booking cancelled successfully"
        });
    }
    catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ error: "Failed to cancel booking" });
    }
}));
exports.default = router;
