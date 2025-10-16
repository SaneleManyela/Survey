// Import both db (the default export) and the new ensureAuth function
import db, { ensureAuth } from './db.js'; 


// ✅ Save a user's survey responses (all 5 pages)
export async function saveSurveyResponse(userId, responses) {
  try {
    // 🛑 CALL AUTHENTICATION FIRST
    await ensureAuth(); 
    
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
    // 🛑 CALL AUTHENTICATION FIRST
    await ensureAuth();
    
    const snapshot = await db.collection('surveyResponses').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error fetching survey responses:", error?.message || error);
    return [];
  }
}


// ✅ Save the generated admin password
export async function saveAdminPassword(password, expiresAt) {
  // ... (logic to handle expiresAt)
  try {
    // 🛑 CALL AUTHENTICATION FIRST
    await ensureAuth();
    
    await db.collection('adminPasswords').doc('current').set({
      password,
    });
    console.log('✅ Admin password saved to Firestore');
    return { success: true };
  } catch (error) {
    console.log("❌ Error saving admin password:", error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

// ✅ Fetch the current admin password (for login check)
export async function getAdminPassword() {
  try {
    // 🛑 CALL AUTHENTICATION FIRST
    await ensureAuth();
    
    const doc = await db.collection('adminPasswords').doc('current').get();
    return doc.exists ? doc.data().password : null;
  } catch (error) {
    console.log("❌ Error fetching admin password:", error?.message || error);
    return null;
  }
}