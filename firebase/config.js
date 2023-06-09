import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHXuhyfcRhKnVvP26e4OuGxhgl04smcvw",
  authDomain: "mobile-blog-ce8b1.firebaseapp.com",
  projectId: "mobile-blog-ce8b1",
  storageBucket: "mobile-blog-ce8b1.appspot.com",
  messagingSenderId: "514832336247",
  appId: "1:514832336247:web:5a6e722f1b0dd407ba8d72",
  measurementId: "G-S91JQXNDJ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// export default app;
