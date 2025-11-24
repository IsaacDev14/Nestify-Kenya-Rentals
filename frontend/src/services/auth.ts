import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface UserData {
    id: string;
    name: string;
    email: string;
    isHost: boolean;
    avatar?: string;
    createdAt: Date;
}

// Register new user
export const registerUser = async (name: string, email: string, password: string): Promise<UserData> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, { displayName: name });

        // Create user document in Firestore
        const userData: UserData = {
            id: user.uid,
            name,
            email,
            isHost: false,
            createdAt: new Date()
        };

        await setDoc(doc(db, "users", user.uid), userData);

        return userData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<UserData> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            return { id: user.uid, ...userDoc.data() } as UserData;
        } else {
            throw new Error("User data not found");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Get current user data
export const getCurrentUserData = async (user: User): Promise<UserData | null> => {
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            return { id: user.uid, ...userDoc.data() } as UserData;
        }
        return null;
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
};

// Auth state listener
export const onAuthChange = (callback: (user: UserData | null) => void) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userData = await getCurrentUserData(user);
            callback(userData);
        } else {
            callback(null);
        }
    });
};
