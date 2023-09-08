import UserController from '../controllers/UserController';

export const signupHandler = {
  createUser: async (email, password, image, name) => {
    if (image instanceof File) {
      return UserController.createUser(email, password, image, name);
    }
    const res = await fetch(image);
    const blob = await res.blob();
    return UserController.createUser(email, password, blob, name);
  },
};
