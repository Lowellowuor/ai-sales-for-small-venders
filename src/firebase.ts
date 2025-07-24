// src/firebase.ts

// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, Auth, User } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Removed due to missing module
// --- Special Global Variables from Canvas Environment ---
// These variables are automatically injected into your app by the Canvas platform.n
// We use them if available, otherwise, we fall back to a hardcoded config.

// Define a fallback Firebase configuration using your provided details
const fallbackFirebaseConfig = {
  apiKey: "AIzaSyCiNW2ABWAwoLxZvpDFktr9ephsL0yv-Ns",
  authDomain: "pitch-poa.firebaseapp.com",
  projectId: "pitch-poa",
  storageBucket: "pitch-poa.firebasestorage.app",
  messagingSenderId: "298784732189",
  appId: "1:298784732189:web:d05829f764b5be8b6ac2f4",
  measurementId: "G-XLKBNR6R25"
};

// Use the global __app_id if defined, otherwise use the projectId from fallback config
const appId: string = typeof (window as any).__app_id !== 'undefined' ? (window as any).__app_id : fallbackFirebaseConfig.projectId;

// Use the global __firebase_config if defined, otherwise use the fallback config
const firebaseConfig: object = typeof (window as any).__firebase_config !== 'undefined' ? JSON.parse((window as any).__firebase_config) : fallbackFirebaseConfig;

// Get the initial authentication token from the global variable
const initialAuthToken: string | null = typeof (window as any).initialAuthToken !== 'undefined' ? (window as any).initialAuthToken : null;


// --- Initialize Firebase Services ---
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
// const analytics: Analytics = getAnalytics(app); // Removed due to missing module


// --- Function to Handle Initial User Authentication ---
// This function attempts to sign in the user using the provided token or anonymously.
const ensureFirebaseAuth = async (): Promise<User | null> => {
    try {
        if (initialAuthToken) {
            // Here you would sign in with the custom token if you have the logic implemented
            // For now, just log and return null as a placeholder
            console.log("Custom token provided, but signInWithCustomToken logic is not implemented.");
            return null;
        } else {
            const userCredential = await signInAnonymously(auth);
            console.log("Signed in anonymously:", userCredential.user.uid);
            return userCredential.user;
        }
    } catch (error) {
        console.error("Firebase Authentication failed:", error);
        // Fallback to anonymous if custom token fails, or if initial attempt fails
        try {
            const userCredential = await signInAnonymously(auth);
            console.log("Attempted anonymous sign-in after initial failure:", userCredential.user.uid);
            return userCredential.user;
        } catch (anonError) {
            console.error("Anonymous sign-in also failed:", anonError);
            return null;
        }
    }
};

// --- Export the Initialized Services and Globals ---
export { db, auth, appId, ensureFirebaseAuth, app }; // Removed analytics from export
