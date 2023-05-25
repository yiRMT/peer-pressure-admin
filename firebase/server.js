import admin from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

var app;

if (!getApps()?.length) {
  app = initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    ),
  })
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);