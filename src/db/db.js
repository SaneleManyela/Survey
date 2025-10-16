// db.js (Ensure the ensureAuth function is exported)

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth'; 
import 'firebase/compat/storage';

// ... firebaseConfig ... (Keep this the same)
const firebaseConfig = {
  apiKey: "AIzaSyAPKkhNgA8drwNFI0HQsJEDQm-qMV5lJZc",
  authDomain: "survey-ce6f0.firebaseapp.com",
  projectId: "survey-ce6f0",
  storageBucket: "survey-ce6f0.firebasestorage.app",
  messagingSenderId: "884714002319",
  appId: "1:884714002319:web:e0d2a8e199c035a8deddfa",
  measurementId: "G-740KVBMWWT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth(); 
export const storage = firebase.storage();

// ✅ This function ensures a user is signed in anonymously ONCE
export async function ensureAuth() {
    // Check if a user (anonymous or otherwise) is already authenticated
    if (auth.currentUser) {
        return auth.currentUser;
    }
    
    // Attempt to sign in anonymously
    try {
        const userCredential = await auth.signInAnonymously();
        console.log("✅ SILENT AUTH: Signed in anonymously.");
        return userCredential.user;
    } catch (error) {
        // This should not happen once Anonymous Auth is enabled in the Console
        console.error("❌ Anonymous sign-in failed. Check Firebase Console settings.", error.message);
        throw error; 
    }
}

export default db;