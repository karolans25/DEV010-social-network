import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';
import StorageService from '../firebase/storageService';

// Create a UserController object
const UserController = {
  createUser: async (email, password, image, name) => {
    try {
      // Sign up the user using the AuthService
      const user = await AuthService.signUp(email, password);
      if (user) {
        const urlProfileImage = await StorageService.uploadFile(image, `${user.uid}/profile.${image.type.split('/')[1]}`);
        await AuthService.updateImgAndName({ displayName: name, photoURL: urlProfileImage });
        // create the user document in store
        const data = {
          email: user.email || email,
          createdAt: serverTimestamp(),
          friends: [],
          name: user.displayName || '',
          photo: user.photoURL || '',
        };
        await StoreService.addDocumentWithId('user', user.uid, data);
        await AuthService.sendEmailVerify(user);
        return 'The user has been registered. Check your email to confirm the account';
      }
      return 'User not created';
    } catch (err) { return err.message; }
  },

  signin: async (email, password) => {
    try {
      const user = await AuthService.login(email, password);
      if (user) {
        if (user.emailVerified) {
          return 'The user has been logged';
        }
        return `The email ${email} hasn't been verified.\nWould you like to receive the email again?`;
      }
      return `The ${email} has'nt been registered`;
    } catch (err) { return err.message; }
  },

  signinGoogle: async () => {
    try {
      const user = await AuthService.loginGoogle();
      if (user) {
        const res = await fetch(user.photoURL);
        const blob = await res.blob();
        const urlProfileImage = await StorageService.uploadFile(blob, `${user.uid}/profile.${blob.type.split('/')[1]}`);
        const storeDoc = await StoreService.getDocumentById('user', user.uid);
        const data = {
          email: user.email,
          createdAt: serverTimestamp(),
          friends: [],
          name: user.displayName || '',
          photo: urlProfileImage || '',
        };
        if (storeDoc.exists) {
          await StoreService.updateDocument('user', user.uid, data);
        } else {
          await StoreService.addDocumentWithId('user', user.uid, data);
        }
        return 'The user has been logged';
      }
      return 'User not logged';
    } catch (err) { return err.message; }
  },

  signinGithub: async () => {

  },

  signout: () => AuthService.logout(),

  resetPassword: (email) => AuthService.sendPassResetEmail(email),

  getUserData: async () => {
    const user = await AuthService.getCurrentUser();
    return user;
  },

  getUserDataById: async (idUser) => {
    const user = await StoreService.getDocumentById('user', idUser);
    return {
      id: idUser,
      name: user.name,
      photo: user.photo,
      email: user.email,
    };
  },

  getAllUsers: () => StoreService.getAllDocuments('user'),
};

// Export the UserController object as the default export
export default UserController;
