import {
  sendEmailVerificationAuth, // sendEmailVerification,
  sendPasswordResetEmailAuth, // sendPasswordResetEmail,
  deleteUserAuth, // deleteUser,
  signUpUser, // createUserWithEmailAndPassword,
  signInUser, // signInWithEmailAndPassword,
  signInGoogle, // GoogleAuthProvider, signInWithPopup,
} from './firebaseUtils';

//   serverTimestamp,
//   collection, doc, setDoc,
//   onSnapshot,
//   // getDocs, addDoc, deleteDoc, query, where, orderBy, getDoc, updateDoc,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,

describe('Firebase Authentication Tests', () => {
  it('should send email verification', async () => {
    const user = { /* create a mock user object */ };
    const result = await sendEmailVerificationAuth(user);
    expect(result).toBe('The email to confirm your account has been sent.');
  });

  it('should send password reset email', async () => {
    const email = 'test@example.com';
    const result = await sendPasswordResetEmailAuth(email);
    expect(result).toBe('The email to restore the password has been sent.');
  });

  it('should sign up a user', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const name = 'Test User';
    const extra = [name];

    const result = await signUpUser(email, password, ...extra);
    expect(result).toBe(`The user has been registered with email ${email}\nCheck your email to confirm the account.`);
  });

  it('should sign in a user', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    const result = await signInUser(email, password);
    expect(result).toBe(`The user has been logged with email ${email}`);
  });
});
