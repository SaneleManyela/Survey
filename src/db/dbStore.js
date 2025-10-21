// src/db/dbStore.js
import db, { ensureAuth } from './db.js';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  Timestamp
} from "firebase/firestore";

// ✅ Save a user's survey responses (all 5 pages)
export async function saveSurveyResponse(userId, responses) {
  try {
    await ensureAuth();

    console.log('Saving survey responses:', responses);

    await addDoc(collection(db, 'surveyResponses'), {
      userId,
      responses,
      timestamp: Timestamp.now()
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error saving survey response:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

// ✅ Fetch all survey responses for admin
export async function getAllSurveyResponses() {
  try {
    await ensureAuth();

    const snapshot = await getDocs(collection(db, 'surveyResponses'));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("❌ Error fetching survey responses:", error?.message || error);
    return [];
  }
}

// ✅ Save the generated admin password
export async function saveAdminPassword(password, expiresAt) {
  try {
    await ensureAuth();

    await setDoc(doc(db, 'adminPasswords', 'current'), {
      password,
      expiresAt: expiresAt || Timestamp.now()
    });

    console.log('✅ Admin password saved to Firestore');
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving admin password:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

// ✅ Fetch the current admin password (for login check)
export async function getAdminPassword() {
  try {
    await ensureAuth();

    const passwordDoc = await getDoc(doc(db, 'adminPasswords', 'current'));
    return passwordDoc.exists() ? passwordDoc.data().password : null;
  } catch (error) {
    console.error("❌ Error fetching admin password:", error?.message || error);
    return null;
  }
}