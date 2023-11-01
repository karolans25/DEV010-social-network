// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyD1k1NAyCqN-At-Um6MrejqTyHvMMA83fI',
//   authDomain: 'social-network-karolans25.firebaseapp.com',
//   projectId: 'social-network-karolans25',
//   storageBucket: 'social-network-karolans25.appspot.com',
//   messagingSenderId: '236349133039',
//   appId: '1:236349133039:web:0c71132ba72b7d473d8b1a',
// };
const firebaseConfig = {
  apiKey: "AIzaSyAVXfLEwzwLiUxU78D5a2Wr_5m4jdQpc3Y",
  authDomain: "dev010-social-network-6c61f.firebaseapp.com",
  projectId: "dev010-social-network-6c61f",
  storageBucket: "dev010-social-network-6c61f.appspot.com",
  messagingSenderId: "368124745038",
  appId: "1:368124745038:web:b9ea52ca7d3ce04fd2ba1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebaseApps previously initialized using initializeApp()
export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

// connectFirestoreEmulator(db, '127.0.0.1', 8080);
// if (window.location.hostname === 'localhost') {
//   // Point to the Storage emulator running on localhost.
//   connectStorageEmulator(storage, '127.0.0.1', 9199, { disableWarnings: true });
// }
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');
