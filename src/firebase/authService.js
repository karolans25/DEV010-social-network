// Import the Firebase authentication module
import {
  sendEmailVerification, sendPasswordResetEmail,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut, updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const actionCodeSettings = {
  url: 'http://localhost:5173/signin',
  handleCodeInApp: true,
};

// Export the AuthService object with authentication-related functions
const AuthService = {
  sendEmailVerify: () => sendEmailVerification(auth.currentUser, actionCodeSettings)
    .then(() => 'The email to confirm your account has been sent.')
    .catch((err) => err.message),

  sendPassResetEmail: (theEmail) => sendPasswordResetEmail(auth, theEmail, actionCodeSettings)
    .then(() => 'The email to restore the password has been sent.')
    .catch((err) => err.message),

  // Function to sign up a user
  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      // Handle any errors that occur during sign up
      throw new Error(error.message);
    }
  },

  // Function to log in a user
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Optionally, you can perform additional actions after successful login
      return userCredential.user;
    } catch (error) {
      // Handle any errors that occur during login
      throw new Error(error.message);
    }
  },

  // Function to log in a user with Google
  loginGoogle: async () => {
    try {
      const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      // Optionally, you can perform additional actions after successful login
      return userCredential.user;
    } catch (error) {
      // Handle any errors that occur during login
      throw new Error(error.message);
    }
  },

  // Function to log out the current user
  logout: async () => {
    try {
      await signOut(auth);
      // Optionally, you can perform additional actions after successful logout
    } catch (error) {
      // Handle any errors that occur during logout
      throw new Error(error.message);
    }
  },

  // Function to get the currently logged in user
  getCurrentUser: () => auth.currentUser,

  // Function to listen for changes in the authentication state
  onAuthStateChanged: (callback) => {
    auth.onAuthStateChanged(callback);
  },

  updateImgAndName: (data) => updateProfile(auth.currentUser, data)
    .catch((err) => err.message),

};

// Export the AuthService object as the default export
export default AuthService;
