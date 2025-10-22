import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

const router = express.Router();

// Configure lowdb adapter and default structure ✅
const adapter = new JSONFile('db.json');
const defaultData = { 
  surveyResponses: [], 
  adminPassword: { password: '', expiresAt: null } 
};

// ✅ Pass default data when creating the Low instance
const db = new Low(adapter, defaultData);

// Initialize database
await db.read();

// If db.json is empty, ensure defaults exist
db.data ||= defaultData;
await db.write();

/**
 * Save a survey response
 * POST /api/saveSurvey
 * body: { userId, responses }
 */
router.post('/saveSurvey', async (req, res) => {
  const { userId, responses } = req.body;

  if (!userId || !responses) {
    return res.status(400).json({ success: false, error: 'Missing userId or responses' });
  }

  await db.read();
  db.data.surveyResponses.push({
    id: nanoid(),
    userId,
    responses,
    timestamp: new Date().toISOString()
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

  if (!password) {
    return res.status(400).json({ success: false, error: 'Missing password' });
  }

  await db.read();
  db.data.adminPassword = {
    password,
    expiresAt: expiresAt || new Date().toISOString()
  };
  await db.write();

  res.json({ success: true });
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