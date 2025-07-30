// =====================================
// FIREBASE CONFIGURATION & INITIALIZATION
// =====================================
const firebaseConfig = {
  apiKey: "AIzaSyCWniDGireh3dg5uQyIRTIeUMgt4iz2jEo",
  authDomain: "amara-lighthouse-77fb9.firebaseapp.com",
  projectId: "amara-lighthouse-77fb9",
  storageBucket: "amara-lighthouse-77fb9.appspot.com",
  messagingSenderId: "202678454398",
  appId: "1:202678454398:web:9184bb4f027cb2d7cbb02f",
  measurementId: "G-ZSSJSZ4K1Q"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =====================================
// DOM ELEMENTS
// =====================================
const loginForm = document.getElementById('loginForm');
const loginBtn = document.querySelector('#loginForm button[type="submit"]');

// =====================================
// LOGIN FUNCTIONALITY
// =====================================
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Show loading state
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Logging in...';

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashBoard.html";
    })
    .catch((error) => {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'alert alert-danger mt-3';
      errorMessage.textContent = error.message;
      loginForm.appendChild(errorMessage);
      setTimeout(() => errorMessage.remove(), 5000);
    })
    .finally(() => {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Log-in';
    });
});

// =====================================
// PASSWORD RESET FUNCTIONALITY
// =====================================
document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
  e.preventDefault();
  new bootstrap.Modal(document.getElementById('resetPasswordModal')).show();
});

document.getElementById('sendResetLinkBtn').addEventListener('click', function() {
  const email = document.getElementById('resetEmail').value;
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

  auth.sendPasswordResetEmail(email)
    .then(() => {
      messageDiv.textContent = "Password reset link sent! Check your email.";
      messageDiv.className = "text-success";
      setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
      }, 3000);
    })
    .catch(error => {
      messageDiv.textContent = error.message;
      messageDiv.className = "text-danger";
    })
    .finally(() => {
      sendBtn.disabled = false;
    });
});