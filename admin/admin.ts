import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const adminServiceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SDK_KEY as string
);

if (!getApps().length!) {
  admin.initializeApp({
    credential: admin.credential.cert(adminServiceAccount),
  });
}

export const adminServiceDB = admin.firestore();
