// src/db/dbStore.js
const API_URL = 'https://survey-u3s9.onrender.com/api'; // ✅ your deployed backend

/**
 * Save a generic single-choice or text-based survey response
 */
export async function saveSurveyResponse(userId, { page, answers }) {
  try {
    const res = await fetch(`${API_URL}/saveSurvey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, page, answers }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error saving survey response:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all standard survey responses
 */
export async function getAllSurveyResponses() {
  try {
    const res = await fetch(`${API_URL}/allSurveys`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
}

/**
 * ✅ Save multi-choice (Likert scale) survey responses
 */
export async function saveMultiChoiceSurveyResponses(userId, page, answers) {
  try {
    const res = await fetch(`${API_URL}/saveMultiChoiceSurvey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, page, answers }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error saving multi-choice survey responses:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ✅ Get all multi-choice survey responses
 */
export async function getAllMultiChoiceSurveyResponses() {
  try {
    const res = await fetch(`${API_URL}/allMultiChoiceSurveys`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching multi-choice survey responses:', error);
    return [];
  }
}

/**
 * Admin password storage + retrieval
 */
export async function saveAdminPassword(password, expiresAt) {
  try {
    const res = await fetch(`${API_URL}/adminPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, expiresAt }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Error saving admin password:', error);
    return { success: false, error: error.message };
  }
}

export async function getAdminPassword() {
  try {
    const res = await fetch(`${API_URL}/adminPassword`);
    const data = await res.json();
    return data.password || null;
  } catch (error) {
    console.error('Error fetching admin password:', error);
    return null;
  }
}