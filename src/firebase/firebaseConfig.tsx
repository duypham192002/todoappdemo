// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDs4Rs1jK1EGa8tiKN_kCXJ3kHASsNO5dI",
  authDomain: "demotodoapp-847d1.firebaseapp.com",
  projectId: "demotodoapp-847d1",
  storageBucket: "demotodoapp-847d1.firebasestorage.app",
  messagingSenderId: "484223625313",
  appId: "1:484223625313:web:855a7f51435d2100b8e220",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
