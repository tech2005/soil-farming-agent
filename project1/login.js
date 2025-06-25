// login.js

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

// Login form submit
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      alert("Login successful!");

      // ✅ Log the login event to Firestore
      try {
        await addDoc(collection(db, "logs"), {
          action: "User Login",
          user: email,
          time: new Date()
        });
        console.log("Login log added.");
      } catch (err) {
        console.error("Error logging to Firestore:", err);
      }

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Login failed for:", email, "Reason:", error.message);
      alert("Login failed: " + error.message);
    });
});
