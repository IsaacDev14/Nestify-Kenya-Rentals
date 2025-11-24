import { Router } from "express";
import { supabase } from "../lib/supabase";

const router = Router();

// Create a new booking
router.post("/", async (req, res) => {
    const { propertyId, checkIn, checkOut, guests, total, userId } = req.body;

    try {
        const { data: booking, error } = await supabase
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

        if (error) throw error;

        res.status(201).json({
            success: true,
            booking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const { data: bookings, error } = await supabase
            .from('Booking')
            .select('*, property:Property(*), user:User(*)');

        if (error) throw error;

        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { data: booking, error } = await supabase
            .from('Booking')
            .select('*, property:Property(*), user:User(*)')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ error: "Failed to fetch booking" });
    }
});

// Cancel booking (Delete)
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { error } = await supabase
            .from('Booking')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({
            success: true,
            message: "Booking cancelled successfully"
        });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ error: "Failed to cancel booking" });
    }
});

export default router;
