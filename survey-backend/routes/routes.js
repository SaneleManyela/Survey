import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure lowdb
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { surveyResponses: [], adminPassword: { password: '', expiresAt: null } });

// Initialize database
await db.read();
db.data ||= { surveyResponses: [], adminPassword: { password: '', expiresAt: null } };
await db.write();

/**
 * Save a survey response
 * POST /api/saveSurvey
 * body: { userId, responses }
 */
router.post('/saveSurvey', async (req, res) => {
  const { userId, responses } = req.body;

  if (!userId || !responses)
    return res.status(400).json({ success: false, error: 'Missing userId or responses' });

  await db.read();
  db.data.surveyResponses.push({
    id: nanoid(),
    userId,
    responses,
    timestamp: new Date().toISOString(),
  });
  await db.write();

  res.json({ success: true });
});

/**
 * Get all survey responses
 * GET /api/allSurveys
 */
router.get('/allSurveys', async (req, res) => {
  await db.read();
  res.json(db.data.surveyResponses);
});

/**
 * Save admin password
 * POST /api/adminPassword
 * body: { password, expiresAt }
 */
router.post('/adminPassword', async (req, res) => {
  const { password, expiresAt } = req.body;
  if (!password)
    return res.status(400).json({ success: false, error: 'Missing password' });

  await db.read();
  db.data.adminPassword = {
    password,
    expiresAt: expiresAt || new Date().toISOString(),
  };
  await db.write();

  // --- Email the password using SMTP ---
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false otherwise
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: 'Survey Admin Password',
      text: `Your admin password is: ${password}\n\nExpires: ${
        db.data.adminPassword.expiresAt
      }`,
      html: `<h3>Your admin password</h3>
             <p><b>${password}</b></p>
             <p>Expires: ${db.data.adminPassword.expiresAt}</p>`,
    });

    console.log('✅ Admin password email sent successfully.');
    res.json({ success: true, emailSent: true });
  } catch (err) {
    console.error('❌ Failed to send admin password email:', err);
    res.json({ success: true, emailSent: false, error: String(err) });
  }
});

/**
 * Get admin password
 * GET /api/adminPassword
 */
router.get('/adminPassword', async (req, res) => {
  await db.read();
  res.json({ password: db.data.adminPassword.password || null });
});

export default router;
