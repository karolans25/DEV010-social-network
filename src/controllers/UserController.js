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
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        };
        await StoreService.updateDocument('user', user.uid, data);
        await AuthService.sendEmailVerify(user);
        return 'The user has been registered. \nCheck your email to confirm the account';
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

  },

  signinGithub: async () => {

  },

  signout: async () => {

  },

  resetPassword: (email) => AuthService.sendPassResetEmail(email),
  // {
  // const signInMethods = await AuthService.checkEmailRegistered(email);
  // if (signInMethods.length === 0) {
  //   await AuthService.sendPassResetEmail(email);
  //   return 'The email to reset password has been sent';
  // }
  // return 'The email hasn\'t been registered yet';
  // },

  getUserData: async () => {
    const user = await AuthService.getCurrentUser();
    return [user.displayName, user.photoURL];
  },
};

// Export the UserController object as the default export
export default UserController;
