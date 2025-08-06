// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyB-ie758XKcPTkRrvupupiIu-6Th7hRn20",
  authDomain: "amara-lighthouse-98405.firebaseapp.com",
  projectId: "amara-lighthouse-98405",
  storageBucket: "amara-lighthouse-98405.appspot.com",
  messagingSenderId: "52542602697",
  appId: "1:52542602697:web:931c73ddfc1547df92bc18",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Optional: Inject CSS if not already in your <style> or CSS file
const style = document.createElement('style');
style.innerHTML = `
  .auth-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
  }

  .btn {
    padding: 12px 16px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    background-color: #643b47;
  }

  .login-btn {
    background-color: #643b47;
    color: white;
    border-radius: 0 0 10px 10px;
  }

  .contact-btn {
    color: #643b47;
  }
`;
document.head.appendChild(style);

// Update UI based on login state
auth.onAuthStateChanged((user) => {
  const authButtons = document.getElementById('authButtons');

  if (user) {
    authButtons.innerHTML = `
      <a href="dashBoard.html" class="btn user-profile-btn">
        <i class="bi bi-person-circle"></i> My Account
      </a>
      <a href="#" class="btn contact-btn">Contact Us</a>
    `;
  } else {
    authButtons.innerHTML = `
      <a href="log-in.html" class="btn login-btn">Login/Sign-up</a>
    `;
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});
