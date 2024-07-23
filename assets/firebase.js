import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCN8BR37O_KyTwPgh-9W1zwhosy4XU3mpA",
      authDomain: "login-e5502.firebaseapp.com",
      projectId: "login-e5502",
      storageBucket: "login-e5502.appspot.com",
      messagingSenderId: "255634704295",
      appId: "1:255634704295:web:e6562d3952d7f621121882"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)