import { Router } from "express";
import { supabase } from "../lib/supabase";

const router = Router();

// Get all messages for a user (Assuming we pass userId in query or use auth middleware later)
router.get("/", async (req, res) => {
    try {
        const { data: messages, error } = await supabase
            .from('Message') // Assuming a Message table exists
            .select('*');

        if (error) throw error;

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Get conversation between two users (or for a specific user)
router.get("/conversation/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const { data: conversation, error } = await supabase
            .from('Message')
            .select('*')
            .or(`senderId.eq.${userId},receiverId.eq.${userId}`)
            .order('timestamp', { ascending: true });

        if (error) throw error;

        res.json(conversation);
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Failed to fetch conversation" });
    }
});

// Send a new message
router.post("/", async (req, res) => {
    const { senderId, senderName, receiverId, receiverName, propertyId, propertyName, message } = req.body;

    try {
        const { data: newMessage, error } = await supabase
            .from('Message')
            .insert([
                {
                    senderId,
                    senderName,
                    receiverId,
                    receiverName,
                    propertyId,
                    propertyName,
                    message,
                    timestamp: new Date().toISOString(),
                    read: false
                }
            ])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// Mark message as read
router.patch("/:id/read", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { data: message, error } = await supabase
            .from('Message')
            .update({ read: true })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json({
            success: true,
            message
        });
    } catch (error) {
        console.error("Error marking message as read:", error);
        res.status(500).json({ error: "Failed to mark message as read" });
    }
});

export default router;
