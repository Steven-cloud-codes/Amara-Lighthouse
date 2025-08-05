// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-ie758XKcPTkRrvupupiIu-6Th7hRn20",
  authDomain: "amara-lighthouse-98405.firebaseapp.com",
  projectId: "amara-lighthouse-98405",
  storageBucket: "amara-lighthouse-98405.firebasestorage.app",
  messagingSenderId: "52542602697",
  appId: "1:52542602697:web:931c73ddfc1547df92bc18",
  measurementId: "G-JL97ZKSRXS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const signupForm = document.getElementById('signupForm');
const signupBtn = document.querySelector('#signupForm button[type="submit"]');
const passwordError = document.getElementById('passwordError');

// Signup Functionality
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const password = document.getElementById('userPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validation
  if (password !== confirmPassword) {
    passwordError.textContent = "Passwords don't match";
    return;
  }

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    return;
  }

  signupBtn.disabled = true;
  signupBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creating account...';

  try {
    // 1. Create account
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);

    // ✅ 2. Set displayName in Firebase Auth
    await userCredential.user.updateProfile({
      displayName: name,
    });

    // 3. Save user data to Firestore
    await db.collection('users').doc(userCredential.user.uid).set({
      name: name,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      emailVerified: false
    });

    // 4. Send email verification
    await userCredential.user.sendEmailVerification();

    alert('Account created! Please verify your email before logging in.');
    window.location.href = "log-in.html";

  } catch (error) {
    console.error("Signup error:", error);

    switch (error.code) {
      case 'auth/email-already-in-use':
        passwordError.textContent = "Email already in use";
        break;
      case 'auth/invalid-email':
        passwordError.textContent = "Invalid email format";
        break;
      case 'auth/weak-password':
        passwordError.textContent = "Password must be at least 6 characters";
        break;
      default:
        passwordError.textContent = "Signup failed. Please try again.";
    }
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = 'Sign-up';
  }
});
