// src/services/firestoreService.ts

import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp, // Import Timestamp for date handling
} from 'firebase/firestore';

// Define an interface for Pitch Session data for better type safety
interface PitchSession {Z
  audioUrl: string;
  transcription: string;
  aiFeedback: string;
  timestamp: Timestamp; // Use Firebase Timestamp type
  userId: string;
  // Add any other relevant fields for a pitch session
}

// Define an interface for User Profile data
interface UserProfile {
  name: string;
  email: string;
  businessName: string;
  createdAt: Timestamp; // Use Firebase Timestamp type
  // Add any other relevant fields for a user profile
}

/**
 * Gets a user's profile data from Firestore.
 * @param db The Firestore instance.
 * @param appId The application ID.
 * @param userId The ID of the current user.
 * @returns A Promise that resolves to the user's profile data or null if not found.
 */
export const getUserProfile = async (
  db: Firestore,
  appId: string,
  userId: string
): Promise<UserProfile | null> => {
  if (!db || !appId || !userId) {
    console.error("getUserProfile: Missing db, appId, or userId.");
    return null;
  }
  try {
    // Path: /artifacts/{appId}/users/{userId}
    const userDocRef = doc(db, `artifacts/${appId}/users/${userId}`);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("User profile data fetched:", docSnap.data());
      return docSnap.data() as UserProfile;
    } else {
      console.log("No user profile found for ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Updates a user's profile data in Firestore. If the document doesn't exist, it creates it.
 * @param db The Firestore instance.
 * @param appId The application ID.
 * @param userId The ID of the current user.
 * @param data The partial data to update (or set if new).
 * @returns A Promise that resolves when the update is complete.
 */
export const updateUserProfile = async (
  db: Firestore,
  appId: string,
  userId: string,
  data: Partial<UserProfile>
): Promise<void> => {
  if (!db || !appId || !userId || !data) {
    console.error("updateUserProfile: Missing db, appId, userId, or data.");
    return;
  }
  try {
    const userDocRef = doc(db, `artifacts/${appId}/users/${userId}`);
    // setDoc with { merge: true } will create the document if it doesn't exist,
    // or merge the new data with existing data if it does.
    await setDoc(userDocRef, data, { merge: true });
    console.log("User profile updated successfully for ID:", userId);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

/**
 * Adds a new pitch session record for a user.
 * @param db The Firestore instance.
 * @param appId The application ID.
 * @param userId The ID of the current user.
 * @param sessionData The data for the new pitch session.
 * @returns A Promise that resolves with the ID of the new document.
 */
export const addPitchSession = async (
  db: Firestore,
  appId: string,
  userId: string,
  sessionData: Omit<PitchSession, 'timestamp' | 'userId'> // Omit timestamp and userId as they're added here
): Promise<string | null> => {
  if (!db || !appId || !userId || !sessionData) {
    console.error("addPitchSession: Missing db, appId, userId, or sessionData.");
    return null;
  }
  try {
    // Path: /artifacts/{appId}/users/{userId}/pitchSessions
    const pitchSessionsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pitchSessions`);
    const newDocRef = await setDoc(doc(pitchSessionsCollectionRef), {
      ...sessionData,
      userId: userId, // Ensure userId is explicitly stored in the subcollection document
      timestamp: Timestamp.now(), // Use Firebase server timestamp
    });
    console.log("New pitch session added with ID:", newDocRef.id);
    return newDocRef.id;
  } catch (error) {
    console.error("Error adding pitch session:", error);
    return null;
  }
};

/**
 * Gets all pitch sessions for a specific user.
 * @param db The Firestore instance.
 * @param appId The application ID.
 * @param userId The ID of the current user.
 * @returns A Promise that resolves to an array of pitch session data.
 */
export const getPitchSessions = async (
  db: Firestore,
  appId: string,
  userId: string
): Promise<PitchSession[]> => {
  if (!db || !appId || !userId) {
    console.error("getPitchSessions: Missing db, appId, or userId.");
    return [];
  }
  try {
    const pitchSessionsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pitchSessions`);
    // You can add orderBy, limit, etc., here if needed
    const q = query(pitchSessionsCollectionRef); // Example: query(pitchSessionsCollectionRef, orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q);
    const sessions: PitchSession[] = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() } as PitchSession); // Include doc.id for reference
    });
    console.log(`Fetched ${sessions.length} pitch sessions for user: ${userId}`);
    return sessions;
  } catch (error) {
    console.error("Error fetching pitch sessions:", error);
    return [];
  }
};
