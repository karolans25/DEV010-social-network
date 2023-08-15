jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
//   test('initializeApp should be called with the correct configuration', () => {
//     expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
//   });
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

