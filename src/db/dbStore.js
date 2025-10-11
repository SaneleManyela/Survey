import db from './db.js';

// ✅ Save a user's survey responses (all 5 pages)
export async function saveSurveyResponse(userId, responses) {
  // responses: { page0: {...}, page1: {...}, ... }
  try {
    await db.collection('surveyResponses').add({
      userId,
      responses,
      timestamp: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving survey response:", error);
    return { success: false, error };
  }
}

// ✅ Fetch all survey responses for admin
export async function getAllSurveyResponses() {
  try {
    const snapshot = await db.collection('surveyResponses').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    return [];
  }
}

// ✅ NEW: Save the generated admin password
export async function saveAdminPassword(password, expiresAt) {
  try {
    await db.collection('adminPasswords').doc('current').set({
      password,
      expiresAt: expiresAt.toISOString(),
      updatedAt: new Date()
    });
    console.log('✅ Admin password saved to Firestore');
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving admin password:", error);
    return { success: false, error };
  }
}

// ✅ Optional: Fetch the current admin password (for login check)
export async function getAdminPassword() {
  try {
    const doc = await db.collection('adminPasswords').doc('current').get();
    if (doc.exists) {
      return { success: true, data: doc.data() };
    } else {
      return { success: false, error: 'No password set' };
    }
  } catch (error) {
    console.error("❌ Error fetching admin password:", error);
    return { success: false, error };
  }
}
