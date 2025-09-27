import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMGmWVch2C_ri5_Xm5-LiXVM0lpdaTB_8",
  authDomain: "adry-f721c.firebaseapp.com",
  projectId: "adry-f721c",
  storageBucket: "adry-f721c.firebasestorage.app",
  messagingSenderId: "154658910845",
  appId: "1:154658910845:web:52dc99217dbe49be82b714"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
