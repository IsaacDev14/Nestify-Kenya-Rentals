import { Router } from "express";

const router = Router();

// Mock bookings storage
const bookings: any[] = [];

// Create a new booking
router.post("/", (req, res) => {
    const { propertyId, checkIn, checkOut, guests, total } = req.body;

    const booking = {
        id: bookings.length + 1,
        propertyId,
        checkIn,
        checkOut,
        guests,
        total,
        status: "confirmed",
        createdAt: new Date().toISOString()
    };

    bookings.push(booking);

    res.status(201).json({
        success: true,
        booking
    });
});

// Get all bookings
router.get("/", (req, res) => {
    res.json(bookings);
});

// Get booking by ID
router.get("/:id", (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));

    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
});

// Cancel booking
router.delete("/:id", (req, res) => {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Booking not found" });
    }

    bookings[index].status = "cancelled";

    res.json({
        success: true,
        booking: bookings[index]
    });
});

export default router;
