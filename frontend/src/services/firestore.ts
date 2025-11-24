// @ts-nocheck
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp
} from "firebase/firestore";
import { db } from "../config/firebase";

// Properties
export const getProperties = async () => {
    const propertiesRef = collection(db, "properties");
    const snapshot = await getDocs(propertiesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPropertyById = async (id: string) => {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Categories
export const getCategories = async () => {
    const categoriesRef = collection(db, "categories");
    const snapshot = await getDocs(categoriesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Bookings
export const createBooking = async (bookingData: any) => {
    const bookingsRef = collection(db, "bookings");
    const docRef = await addDoc(bookingsRef, {
        ...bookingData,
        createdAt: Timestamp.now(),
        status: "pending"
    });
    return docRef.id;
};

export const getUserBookings = async (userId: string) => {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Wishlist
export const addToWishlist = async (userId: string, propertyId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const currentWishlist = userDoc.data()?.wishlist || [];

    if (!currentWishlist.includes(propertyId)) {
        await updateDoc(userRef, {
            wishlist: [...currentWishlist, propertyId]
        });
    }
};

export const removeFromWishlist = async (userId: string, propertyId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const currentWishlist = userDoc.data()?.wishlist || [];

    await updateDoc(userRef, {
        wishlist: currentWishlist.filter((id: string) => id !== propertyId)
    });
};

export const getWishlist = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.wishlist || [];
};

// Messages
export const sendMessage = async (conversationId: string, senderId: string, text: string) => {
    const messagesRef = collection(db, `messages/${conversationId}/messages`);
    await addDoc(messagesRef, {
        senderId,
        text,
        timestamp: Timestamp.now()
    });

    // Update conversation last message
    const convRef = doc(db, "messages", conversationId);
    await updateDoc(convRef, {
        lastMessage: text,
        updatedAt: Timestamp.now()
    });
};

export const getConversations = async (userId: string) => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("participants", "array-contains", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Real-time listeners
export const subscribeToMessages = (conversationId: string, callback: (messages: any[]) => void) => {
    const messagesRef = collection(db, `messages/${conversationId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(messages);
    });
};
