import { getAdminPassword } from '../db/dbStore.js';

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

  await getAdminPassword().then(adminPassword => {
    adminPassword.collection('adminPasswords').doc('current').set({
      password,
      expiresAt: expiresAt.toISOString()
    });
  });

  console.log("New admin password generated:", password);
}

// Optional auto-refresh every 24h
export function startPasswordScheduler() {
  schedulePassword();
  const oneDay = 24 * 60 * 60 * 1000;
  setInterval(schedulePassword, oneDay);
}
