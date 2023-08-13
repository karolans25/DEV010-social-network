// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1k1NAyCqN-At-Um6MrejqTyHvMMA83fI',
  authDomain: 'social-network-karolans25.firebaseapp.com',
  projectId: 'social-network-karolans25',
  storageBucket: 'social-network-karolans25.appspot.com',
  messagingSenderId: '236349133039',
  appId: '1:236349133039:web:0c71132ba72b7d473d8b1a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebaseApps previously initialized using initializeApp()
export const db = getFirestore();
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export const storage = getStorage();
if (location.hostname === 'localhost') {
  // Point to the Storage emulator running on localhost.
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

export const auth = getAuth();
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
