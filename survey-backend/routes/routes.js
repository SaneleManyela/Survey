import express from "express";
import { db } from "../server.js"; // db imported from server.js
import nodemailer from "nodemailer";

const router = express.Router();

/**
 * Save a survey response (per page)
 * POST /api/saveSurvey
 * body: { userId, page, answers }
 */
router.post("/saveSurvey", async (req, res) => {
  const { userId, page, answers } = req.body;
  if (!userId || !page || !answers)
    return res.status(400).json({ success: false, error: "Missing required fields" });

  try {
    const userDocRef = db.collection("surveyResponses").doc(userId);

    await userDocRef.set(
      {
        [page]: answers,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving survey to Firestore:", err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

/**
 * Get all survey responses
 * GET /api/allSurveys
 */
router.get("/allSurveys", async (req, res) => {
  try {
    const snapshot = await db.collection("surveyResponses").get();
    const allResponses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(allResponses);
  } catch (err) {
    console.error("Error fetching surveys:", err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

/**
 * Save admin password
 * POST /api/adminPassword
 * body: { password, expiresAt }
 */
router.post("/adminPassword", async (req, res) => {
  const { password, expiresAt } = req.body;
  if (!password)
    return res.status(400).json({ success: false, error: "Missing password" });

  try {
    await db.collection("admin").doc("password").set({
      password,
      expiresAt: expiresAt || new Date().toISOString(),
    });

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: "Survey Admin Password",
      text: `Your admin password is: ${password}\nExpires: ${expiresAt || new Date().toISOString()}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving admin password:", err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

/**
 * Get admin password
 * GET /api/adminPassword
 */
router.get("/adminPassword", async (req, res) => {
  try {
    const doc = await db.collection("admin").doc("password").get();
    res.json({ password: doc.exists ? doc.data().password : null });
  } catch (err) {
    console.error("Error fetching admin password:", err);
    res.status(500).json({ password: null, error: String(err) });
  }
});

export default router;
