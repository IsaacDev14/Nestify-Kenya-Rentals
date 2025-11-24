import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Message {
    id: number;
    senderId: number;
    senderName: string;
    receiverId: number;
    receiverName: string;
    propertyId: number;
    propertyName: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface Conversation {
    userId: number;
    userName: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    propertyName: string;
}

const MessagesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        fetchMessages();
    }, [user, navigate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/messages");
            const allMessages = response.data;
            setMessages(allMessages);

            // Group messages into conversations
            const convMap = new Map<number, Conversation>();

            allMessages.forEach((msg: Message) => {
                const otherUserId = msg.senderId === user?.id ? msg.receiverId : msg.senderId;
                const otherUserName = msg.senderId === user?.id ? msg.receiverName : msg.senderName;

                if (!convMap.has(otherUserId)) {
                    convMap.set(otherUserId, {
                        userId: otherUserId,
                        userName: otherUserName,
                        lastMessage: msg.message,
                        timestamp: msg.timestamp,
                        unread: msg.senderId !== user?.id && !msg.read ? 1 : 0,
                        propertyName: msg.propertyName
                    });
                } else {
                    const conv = convMap.get(otherUserId)!;
                    if (new Date(msg.timestamp) > new Date(conv.timestamp)) {
                        conv.lastMessage = msg.message;
                        conv.timestamp = msg.timestamp;
                    }
                    if (msg.senderId !== user?.id && !msg.read) {
                        conv.unread++;
                    }
                }
            });

            setConversations(Array.from(convMap.values()).sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            ));

            setLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim() || selectedConversation === null) return;

        const conversation = conversations.find(c => c.userId === selectedConversation);
        if (!conversation) return;

        try {
            await axios.post("http://localhost:5000/api/messages", {
                senderId: user?.id,
                senderName: user?.name,
                receiverId: selectedConversation,
                receiverName: conversation.userName,
                propertyId: 1,
                propertyName: conversation.propertyName,
                message: newMessage
            });

            setNewMessage("");
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const getConversationMessages = () => {
        if (selectedConversation === null) return [];

        return messages.filter(
            m => (m.senderId === user?.id && m.receiverId === selectedConversation) ||
                (m.receiverId === user?.id && m.senderId === selectedConversation)
        ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading messages...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-8 flex-grow">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>

                <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
                    <div className="grid grid-cols-3 h-full">
                        {/* Conversations List */}
                        <div className="col-span-1 border-r border-gray-200 overflow-y-auto">
                            {conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <p>No messages yet</p>
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.userId}
                                        onClick={() => setSelectedConversation(conv.userId)}
                                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conv.userId ? "bg-blue-50" : ""
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {conv.userName.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-gray-800 truncate">{conv.userName}</h3>
                                                        {conv.unread > 0 && (
                                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                                                                {conv.unread}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate">{conv.propertyName}</p>
                                                    <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{formatTime(conv.timestamp)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Chat Area */}
                        <div className="col-span-2 flex flex-col">
                            {selectedConversation === null ? (
                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <svg className="h-20 w-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <p className="text-lg">Select a conversation to start messaging</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-gray-200 bg-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {conversations.find(c => c.userId === selectedConversation)?.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {conversations.find(c => c.userId === selectedConversation)?.userName}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    {conversations.find(c => c.userId === selectedConversation)?.propertyName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                        {getConversationMessages().map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === user?.id
                                                            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                                            : "bg-white text-gray-800 shadow-md"
                                                        }`}
                                                >
                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className={`text-xs mt-1 ${msg.senderId === user?.id ? "text-red-100" : "text-gray-400"}`}>
                                                        {formatTime(msg.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input */}
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newMessage.trim()}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MessagesPage;
