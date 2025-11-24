import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBadT6ouTe0l7JoHH5rPeqh_qjBqxJCxQ4",
    authDomain: "ai-tutor-app-96e60.firebaseapp.com",
    projectId: "ai-tutor-app-96e60",
    storageBucket: "ai-tutor-app-96e60.firebasestorage.app",
    messagingSenderId: "829807447011",
    appId: "1:829807447011:web:7ee1ff268937fdcb6deed6",
    measurementId: "G-BZYX7XKXV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics only in browser
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
