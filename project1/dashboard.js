// dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Protect dashboard route - only allow logged-in users
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Access denied. Please login first.");
    window.location.href = "login.html";
  }
});

// Logout functionality
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logged out successfully.");
      window.location.href = "login.html";
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  });
}
