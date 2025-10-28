// Passwordscheduler.js
import { saveAdminPassword } from '../db/dbStore.js'; // ⬅️ NEW: Import the correct saving function

function generateRandomPassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function schedulePassword() {
  const password = generateRandomPassword();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1); // expires in 1 day

  const result = await saveAdminPassword(password, expiresAt);

  if (result.success) {
      console.log("✅ New admin password successfully scheduled.");
  } else {
      console.error("❌ Failed to schedule admin password:", result.error);
  }

  console.log("New admin password generated:", password);
}

// Optional auto-refresh every 24h
export function startPasswordScheduler() {
  schedulePassword();
  const oneDay = 24 * 60 * 60 * 1000;
  setInterval(schedulePassword, oneDay);
}