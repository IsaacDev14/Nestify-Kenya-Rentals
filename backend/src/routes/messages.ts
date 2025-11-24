import { Router } from "express";

const router = Router();

// Mock messages storage
const messages: any[] = [
    {
        id: 1,
        senderId: 1,
        senderName: "John Host",
        receiverId: 2,
        receiverName: "Jane Guest",
        propertyId: 1,
        propertyName: "Luxury Beach Villa",
        message: "Hi! I'm interested in booking your property for next week.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true
    },
    {
        id: 2,
        senderId: 2,
        senderName: "Jane Guest",
        receiverId: 1,
        receiverName: "John Host",
        propertyId: 1,
        propertyName: "Luxury Beach Villa",
        message: "Great! The property is available. Would you like to proceed with the booking?",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: false
    }
];

// Get all messages for a user
router.get("/", (req, res) => {
    // In a real app, filter by authenticated user ID
    res.json(messages);
});

// Get conversation between two users
router.get("/conversation/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const conversation = messages.filter(
        m => m.senderId === userId || m.receiverId === userId
    );

    res.json(conversation);
});

// Send a new message
router.post("/", (req, res) => {
    const { senderId, senderName, receiverId, receiverName, propertyId, propertyName, message } = req.body;

    const newMessage = {
        id: messages.length + 1,
        senderId,
        senderName,
        receiverId,
        receiverName,
        propertyId,
        propertyName,
        message,
        timestamp: new Date().toISOString(),
        read: false
    };

    messages.push(newMessage);

    res.status(201).json({
        success: true,
        message: newMessage
    });
});

// Mark message as read
router.patch("/:id/read", (req, res) => {
    const message = messages.find(m => m.id === parseInt(req.params.id));

    if (!message) {
        return res.status(404).json({ error: "Message not found" });
    }

    message.read = true;

    res.json({
        success: true,
        message
    });
});

export default router;
