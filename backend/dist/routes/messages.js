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
// Get all messages for a user (Assuming we pass userId in query or use auth middleware later)
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: messages, error } = yield supabase_1.supabase
            .from('Message') // Assuming a Message table exists
            .select('*');
        if (error)
            throw error;
        res.json(messages);
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
}));
// Get conversation between two users (or for a specific user)
router.get("/conversation/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { data: conversation, error } = yield supabase_1.supabase
            .from('Message')
            .select('*')
            .or(`senderId.eq.${userId},receiverId.eq.${userId}`)
            .order('timestamp', { ascending: true });
        if (error)
            throw error;
        res.json(conversation);
    }
    catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Failed to fetch conversation" });
    }
}));
// Send a new message
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, senderName, receiverId, receiverName, propertyId, propertyName, message } = req.body;
    try {
        const { data: newMessage, error } = yield supabase_1.supabase
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
        if (error)
            throw error;
        res.status(201).json({
            success: true,
            message: newMessage
        });
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
}));
// Mark message as read
router.patch("/:id/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { data: message, error } = yield supabase_1.supabase
            .from('Message')
            .update({ read: true })
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json({
            success: true,
            message
        });
    }
    catch (error) {
        console.error("Error marking message as read:", error);
        res.status(500).json({ error: "Failed to mark message as read" });
    }
}));
exports.default = router;
