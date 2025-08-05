<script>
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB-ie758XKcPTkRrvupupiIu-6Th7hRn20",
    authDomain: "amara-lighthouse-98405.firebaseapp.com",
    projectId: "amara-lighthouse-98405",
    storageBucket: "amara-lighthouse-98405.appspot.com",
    messagingSenderId: "52542602697",
    appId: "1:52542602697:web:931c73ddfc1547df92bc18",
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Check auth state and update UI
  auth.onAuthStateChanged((user) => {
    const authButtons = document.getElementById('authButtons');
    
    if (user) {
      // User is logged in - show profile icon
      authButtons.innerHTML = `
        <a href="dashBoard.html" class="btn user-profile-btn">
          <i class="bi bi-person-circle"></i> My Account
        </a>
        <a href="#" class="btn contact-btn">Contact Us</a>
      `;
    } else {
      // User is not logged in - show login/signup
      authButtons.innerHTML = `
        <a href="log-in.html" class="btn login-btn">Login/Sign-up</a>
        <a href="#" class="btn contact-btn">Contact Us</a>
      `;
    }
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".main-nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
</script>