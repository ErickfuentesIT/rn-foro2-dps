// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcFYSmrf86FRaZV-RPa8FAcGwmfTKu_M8",
  authDomain: "rn-auth-f2-demo.firebaseapp.com",
  projectId: "rn-auth-f2-demo",
  storageBucket: "rn-auth-f2-demo.firebasestorage.app",
  messagingSenderId: "767768249191",
  appId: "1:767768249191:web:79654fc5be9d1f789325c2",
  measurementId: "G-9K60K5DPDG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
