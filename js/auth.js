// Firebase Config — REPLACE WITH YOUR OWN
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authModal = document.getElementById('authModal');
const app = document.getElementById('app');
const closeAuth = document.getElementById('closeAuth');
const authForm = document.getElementById('authForm');
const userPanel = document.getElementById('userPanel');
const displayName = document.getElementById('displayName');
const userInfo = document.getElementById('userInfo');

// Close modal
closeAuth.onclick = () => authModal.style.display = 'none';

// Toggle between sign-in and sign-up
let isSignUp = false;
document.getElementById('switchToSignup').onclick = (e) => {
  e.preventDefault();
  isSignUp = true;
  document.getElementById('authTitle').textContent = 'Sign Up';
  document.getElementById('authSubmit').textContent = 'Create Account';
};

// Auth submit
document.getElementById('authSubmit').onclick = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    if (isSignUp) {
      await auth.createUserWithEmailAndPassword(email, password);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
    location.reload(); // Ensures clean state
  } catch (err) {
    alert('Auth Error: ' + err.message);
  }
};

// Sign out
document.getElementById('signOutBtn').onclick = () => {
  auth.signOut().then(() => location.reload());
};

// Monitor auth state
auth.onAuthStateChanged(user => {
  if (user) {
    // Extract username from email (before @)
    const username = user.email.split('@')[0];
    displayName.textContent = username;
    userInfo.textContent = username; // Only username in UI
    authModal.style.display = 'none';
    app.style.display = 'block';
  } else {
    authModal.style.display = 'flex';
    app.style.display = 'none';
  }
});
