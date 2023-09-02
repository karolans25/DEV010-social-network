// Import the necessary services
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
        return `The user has been registered with email ${user.email}\nCheck your email to confirm the account.`;
      }
      return 'User not created';
    } catch (err) { return err.message; }
  },
};

// Export the UserController object as the default export
export default UserController;
