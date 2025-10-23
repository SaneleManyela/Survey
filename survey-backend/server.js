import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import surveyRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 1. CORS middleware FIRST (before anything)
app.use(cors({
  origin: "https://sanelemanyela.github.io",
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// 🚧 2. Diagnostic handler to catch preflight requests
// (instead of app.options('*', ...), which caused path-to-regexp error)
app.use((req, res, next) => {
  console.log(`🧭 ${req.method} ${req.path}`);
  if (req.method === "OPTIONS") {
    console.log("🛰️ Preflight received!");
    res.header("Access-Control-Allow-Origin", "https://sanelemanyela.github.io");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.sendStatus(204);
  }
  next();
});

// ✅ 3. JSON body parser after CORS
app.use(express.json());

// ✅ 4. Your routes
app.use("/api", surveyRoutes);

// ✅ 5. Test route
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://sanelemanyela.github.io");
  res.send("Server is alive ✅");
});

// ✅ 6. Firebase
if (!admin.apps.length) {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

app.listen(PORT, () => {
  console.log(`🚀 Survey backend running on port ${PORT}`);
});
