import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import surveyRoutes from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://sanelemanyela.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // add headers your frontend sends
}));

// Handle preflight requests
app.options('/api/*', cors());

app.use(express.json());

// Basic test route
app.get("/", (req, res) => res.send("Server is alive ✅"));

// ✅ Use your survey routes
//app.use("/api", surveyRoutes);

// 🔥 Initialize Firebase Admin SDK
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Survey backend running on port ${PORT}`);
});
