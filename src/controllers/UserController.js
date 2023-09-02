// Import the necessary services
import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';
import StorageService from '../firebase/storageService';

// Create a UserController object
const UserController = {
  createUser: async (email, password, ...extra) => {
    try {
    // Sign up the user using the AuthService
      const credential = await AuthService.signUp(email, password);
      const user = credential.user;
      console.log(user);
      if (user && extra) {
        const urlProfileImage = await StorageService.uploadFile(extra[1], `${user.uid}/profile.${extra[1].type.split('/')[1]}`);
        // update profile with name and url photo in auth
        await AuthService.updateImgAndName({ displayName: extra[0], photoURL: urlProfileImage });
      }
      if (user) {
        // create the user document in store
        const data = {
          email: user.email,
          createdAt: serverTimestamp(),
          friends: [],
          displayName: user.displayImage || '',
          photoURL: user.photoURL || '',
        };
        await StoreService.updateDocument('user', user.uid, data);
      }
      await AuthService.sendEmailVerify(user);
      console.log(`The user has been registered with email ${user.email}\nCheck your email to confirm the account.`);
      return user;
    } catch (err) { return err.message; }
  },
};

// Export the UserController object as the default export
export default UserController;
