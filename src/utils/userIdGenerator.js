// src/utils/userIdGenerator.js

export function getUserId() {
  // Check if a userId already exists in localStorage
  let userId = localStorage.getItem("surveyUserId");
  if (!userId) {
    // Generate a new random ID
    userId = generateRandomId(12); // length 12
    localStorage.setItem("surveyUserId", userId);
  }
  return userId;
}

function generateRandomId(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
