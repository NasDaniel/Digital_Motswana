import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  // Toggle between sign-up and sign-in forms
  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    container.classList.remove("active");
  });

  // Handle Sign Up
  document.getElementById('signUpForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
      });

      alert('Sign up successful!');
      console.log('User:', user);

      // Redirect to the user page after successful registration
      window.location.href = 'user.html';
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed. Please try again.');
    }
  });

  // Handle Sign In
  document.getElementById('signInForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('Sign in successful!');
      console.log('User:', user);

      // Redirect to the user page after successful login
      window.location.href = 'user.html';
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Sign in failed. Please try again.');
    }
  });
});