import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth'; // <--- Auth is already here
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPKkhNgA8drwNFI0HQsJEDQm-qMV5lJZc",
  authDomain: "survey-ce6f0.firebaseapp.com",
  projectId: "survey-ce6f0",
  storageBucket: "survey-ce6f0.appspot.com",
  messagingSenderId: "884714002319",
  appId: "1:884714002319:web:e0d2a8e199c035a8deddfa",
  measurementId: "G-740KVBMWWT"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth(); // <--- Auth object is created
export const storage = firebase.storage();

// ✅ NEW: Function to ensure the client is authenticated anonymously
export async function ensureAuth() {
    if (auth.currentUser) {
        // Already signed in, do nothing
        return auth.currentUser;
    }
    try {
        const userCredential = await auth.signInAnonymously();
        console.log("✅ Signed in anonymously with UID:", userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        console.error("❌ Anonymous sign-in failed:", error.message);
        // Throwing the error prevents Firestore operations from running
        throw error; 
    }
}

export default db;