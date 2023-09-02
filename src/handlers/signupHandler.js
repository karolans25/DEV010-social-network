import UserController from '../controllers/UserController';

export const signupHandler = {
  createUser: (email, password, image, name) => fetch(image)
    .then((res) => res.blob())
    .then((blob) => UserController.createUser(email, password, blob, name))
    .catch((err) => err.message),
};
