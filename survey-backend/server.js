// survey-backend/server.js
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔥 Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("./firebaseServiceAccountKey.json"),
});

const db = admin.firestore();

// ✅ Save survey response
app.post("/api/saveSurvey", async (req, res) => {
  try {
    const { userId, responses } = req.body;
    if (!userId || !responses) return res.status(400).json({ error: "Missing data" });

    await db.collection("surveyResponses").add({
      id: nanoid(),
      userId,
      responses,
      timestamp: admin.firestore.Timestamp.now(),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving survey:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Get all survey responses (admin)
app.get("/api/allSurveys", async (req, res) => {
  try {
    const snapshot = await db.collection("surveyResponses").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Save admin password
app.post("/api/adminPassword", async (req, res) => {
  try {
    const { password, expiresAt } = req.body;
    await db.collection("adminPasswords").doc("current").set({
      password,
      expiresAt: expiresAt ? admin.firestore.Timestamp.fromDate(new Date(expiresAt)) : admin.firestore.Timestamp.now(),
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get admin password
app.get("/api/adminPassword", async (req, res) => {
  try {
    const doc = await db.collection("adminPasswords").doc("current").get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
