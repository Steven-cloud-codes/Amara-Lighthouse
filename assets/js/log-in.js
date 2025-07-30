// =====================================
// FIREBASE CONFIGURATION & INITIALIZATION
// =====================================
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// =====================================
// DOM ELEMENTS
// =====================================
const loginForm = document.getElementById('loginForm');
const loginBtn = document.querySelector('#loginForm button[type="submit"]');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');

// =====================================
// LOGIN FUNCTIONALITY (Single Handler)
// =====================================
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  // Show loading state
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Logging in...';

  try {
    // 1. Authenticate
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // 2. Email verification check
    if (!userCredential.user.emailVerified) {
      await auth.signOut();
      alert("Please verify your email first. Check your inbox (including spam folder)!");
      return;
    }
    
    // 3. Update last login timestamp
    await db.collection('users').doc(userCredential.user.uid).update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // 4. Redirect to dashboard
    window.location.href = "dashBoard.html";
    
  } catch (error) {
    // Handle errors
    let message = "Login failed. Please try again.";
    switch(error.code) {
      case 'auth/user-not-found':
        message = "No account found with this email";
        break;
      case 'auth/wrong-password':
        message = "Incorrect password";
        break;
      case 'auth/too-many-requests':
        message = "Account temporarily locked. Try again later";
        break;
      case 'auth/invalid-email':
        message = "Invalid email format";
        break;
    }
    alert(message);
    console.error("Login error:", error);
  } finally {
    // Reset button state
    loginBtn.disabled = false;
    loginBtn.textContent = 'Log-in';
  }
});

// =====================================
// PASSWORD RESET FUNCTIONALITY
// =====================================
forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  new bootstrap.Modal(document.getElementById('resetPasswordModal')).show();
});

document.getElementById('sendResetLinkBtn').addEventListener('click', async () => {
  const email = document.getElementById('resetEmail').value.trim();
  const messageDiv = document.getElementById('resetMessage');
  const sendBtn = document.getElementById('sendResetLinkBtn');
  
  if (!email) {
    messageDiv.textContent = "Please enter your email";
    messageDiv.className = "text-danger";
    return;
  }

  // Show loading state
  sendBtn.disabled = true;
  messageDiv.textContent = "Sending...";
  messageDiv.className = "text-info";

  try {
    await auth.sendPasswordResetEmail(email);
    messageDiv.textContent = "Password reset link sent! Check your email.";
    messageDiv.className = "text-success";
    setTimeout(() => {
      bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
    }, 3000);
  } catch (error) {
    messageDiv.textContent = error.message;
    messageDiv.className = "text-danger";
  } finally {
    sendBtn.disabled = false;
  }
});