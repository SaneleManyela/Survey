import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import surveyRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * ✅ Global CORS configuration
 */
const corsOptions = {
  origin: "https://sanelemanyela.github.io",
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

/**
 * ✅ Handle all OPTIONS (preflight) requests
 */
app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sanelemanyela.github.io");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204);
});

/**
 * ✅ Parse JSON bodies
 */
app.use(express.json());

/**
 * ✅ Initialize Firebase Admin safely for Render
 */
try {
  if (!admin.apps.length) {
    if (!process.env.FIREBASE_PROJECT_ID) {
      console.error("❌ Missing Firebase environment variables");
      throw new Error("Missing Firebase configuration in environment");
    }

    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log(`✅ Firebase initialized for project: ${serviceAccount.project_id}`);
  }
} catch (error) {
  console.error("🔥 Firebase Admin initialization failed:", error);
}

/**
 * ✅ Firestore reference
 */
export const db = admin.firestore();

/**
 * ✅ Routes
 */
app.use("/api", surveyRoutes);

/**
 * ✅ Test route
 */
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sanelemanyela.github.io");
  res.send("Server is alive ✅");
});

/**
 * ✅ Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 Survey backend running on port ${PORT}`);
});
