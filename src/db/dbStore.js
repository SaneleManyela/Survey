const API_URL = 'http://localhost:5000/api'; // Update with your deployed URL

export async function saveSurveyResponse(userId, responses) {
  try {
    const res = await fetch(`${API_URL}/saveSurvey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, responses })
    });
    return await res.json();
  } catch (error) {
    console.error('Error saving survey response:', error);
    return { success: false, error: error.message };
  }
}

export async function getAllSurveyResponses() {
  try {
    const res = await fetch(`${API_URL}/allSurveys`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
}

export async function saveAdminPassword(password, expiresAt) {
  try {
    const res = await fetch(`${API_URL}/adminPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, expiresAt })
    });
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