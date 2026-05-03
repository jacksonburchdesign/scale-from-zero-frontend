import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0K1NVAtPwWmRvl9R_6qPWHeGZvJ5LKh4",
  authDomain: "scale-from-zero.firebaseapp.com",
  projectId: "scale-from-zero",
  storageBucket: "scale-from-zero.firebasestorage.app",
  messagingSenderId: "36375634350",
  appId: "1:36375634350:web:54aeb1d3ae5d60895f683f",
  measurementId: "G-RCKGF09XVC"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const githubProvider = new GithubAuthProvider();
