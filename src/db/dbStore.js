import db from './db.js';

// ... (saveSurveyResponse and getAllSurveyResponses remain the same) ...

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
    console.error("❌ Error saving survey response:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

// ✅ Fetch all survey responses for admin
export async function getAllSurveyResponses() {
  try {
    const snapshot = await db.collection('surveyResponses').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error fetching survey responses:", error?.message || error);
    return [];
  }
}


// ✅ NEW: Save the generated admin password
export async function saveAdminPassword(password, expiresAt) {
  // Ensure expiresAt is passed as a Date object from the scheduler
  const expiresAtValue = expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt;

  try {
    await db.collection('adminPasswords').doc('current').set({
      password,
      expiresAt: expiresAtValue, // Use the prepared string value
      updatedAt: new Date()
    });
    console.log('✅ Admin password saved to Firestore');
    return { success: true };
  } catch (error) {
    // 💡 Improvement: Log the message for clarity
    console.error("❌ Error saving admin password:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
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
    // 💡 Improvement: Log the message for clarity
    console.error("❌ Error fetching admin password:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}