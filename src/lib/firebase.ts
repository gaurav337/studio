import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "cosmic-portfolio-vkv5u",
  appId: "1:132524328517:web:b13ecd4b4fca86228b452c",
  storageBucket: "cosmic-portfolio-vkv5u.firebasestorage.app",
  apiKey: "AIzaSyAHroGq8qUgDzrpXDhfhlvJ8nqPEDinGe8",
  authDomain: "cosmic-portfolio-vkv5u.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "132524328517"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
