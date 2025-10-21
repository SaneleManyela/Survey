// src/db/db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPKkhNgA8drwNFI0HQsJEDQm-qMV5lJZc",
  authDomain: "survey-ce6f0.firebaseapp.com",
  projectId: "survey-ce6f0",
  storageBucket: "survey-ce6f0.appspot.com",
  messagingSenderId: "884714002319",
  appId: "1:884714002319:web:e0d2a8e199c035a8deddfa",
  measurementId: "G-740KVBMWWT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function ensureAuth() {
  if (!auth.currentUser) await signInAnonymously(auth);
  return auth.currentUser;
}

export default db;
// src/db/dbStore.js