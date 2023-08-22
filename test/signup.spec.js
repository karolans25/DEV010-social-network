// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { signUpUser } from '../src/lib/index';
import { popup } from '../src/components/popup';

import signup from '../src/components/signup';

const { window } = new JSDOM();
global.document = window.document;

// Mock for navigateTo
const navigateToMock = jest.fn();

// Mock for fetch
const fetchMock = jest.fn();

// Mock the URL.createObjectURL function
URL.createObjectURL = jest.fn().mockReturnValue('mocked-url');

describe('Sign Up Component', () => {
  let signupComponent;
  let aBack;
  let img;
  let buttonLeft;
  let buttonRight;
  let inputFile;
  let inputName;
  let inputEmail;
  let inputPassword;
  let inputPasswordConfirm;
  let buttonSignup;

  // Configure the Init Component before each test
  beforeEach(() => {
    signupComponent = signup(navigateToMock);
    aBack = signupComponent.querySelector('a');
    img = document.createElement('img');
    buttonLeft = signupComponent.querySelector('[name="left"]');
    buttonRight = signupComponent.querySelector('[name="right"]');
    inputFile = signupComponent.querySelector('[type="file"]');
    inputFile.type = 'file';
    inputFile.setAttribute('accep', 'image/*');
    inputFile.addEventListener('change', () => {
      img.src = URL.createObjectURL(inputFile.files[0]);
      img.style.width = '162px';
      img.style.height = '162px';
      img.style.borderRadius = '50%';
    });
    inputName = signupComponent.querySelector('[type="text"]');
    inputEmail = signupComponent.querySelector('[type="email"]');
    inputPassword = signupComponent.querySelectorAll('[type="password"]')[0];
    inputPasswordConfirm = signupComponent.querySelectorAll('[type="password"]')[1];
    buttonSignup = signupComponent.querySelector('[type="submit"]');
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('must be a function', () => {
    expect(typeof signup).toBe('function');
  });

  it('signup function should return a section element', () => {
    const section = signup();
    expect(section.tagName).toBe('SECTION');
  });

  // back link
  it('back link should redirect to "Sign in" screen on click on "back" link ', () => {
    expect(aBack.getAttribute('href')).toBe('/signin');
  });

  // left button

  // right button

  // input choose file
  describe('Input (file) to upload images in sign up', () => {
    test('should update the image source when the input changes', () => {
      /*
      const e = {
        target: {
          files: [
            { name: 'test-image.jpg', type: 'image/jpeg' },
          ],
        },
      };
      */

      // eslint-disable-next-line no-undef
      inputFile.dispatchEvent(new window.Event('change'));
      expect(img.src).toBe('mocked-url');
      expect(img.style.width).toBe('162px');
      expect(img.style.height).toBe('162px');
      expect(img.style.borderRadius).toBe('50%');
    });
  });

  describe('Form submit event', () => {
    test('should call signUpUser and reset form on successful response and redirect to "Sign in" screen', async () => {
      // Mock the necessary functions
      inputEmail.value = 'test@example.com';
      inputPassword.value = '123456';
      inputName.value = 'test display name';

      const mockSignUpUser = jest.fn().mockResolvedValueOnce('The user has been registered...');
      const mockPopup = jest.fn();

      // Mock fetch response
      const mockBlob = new Blob();
      const mockResponse = new Response(mockBlob);
      fetchMock.mockOnce(mockResponse);

      // Set up the DOM elements for testing
      const form = document.createElement('form');
      // const inputEmail = document.createElement('input');
      // ... create other necessary DOM elements

      // Call the event handler
      await form.addEventListener('submit', async (e) => {
        // Prevent form submission
        e.preventDefault();
        // Set values for input fields
        // ... set values for other input fields

        // Call the function under test
        await signUpUser(inputEmail.value, inputPassword.value, inputName.value, mockBlob);

        // Assertions
        expect(mockSignUpUser).toHaveBeenCalledWith('test@example.com' /* ... */);
        expect(form.reset).toHaveBeenCalled();
        // ... add more assertions for other expected behaviors
      });
    });
  });

  // sign up button
  // it('"Sign up" button should redirect to "Sign In" screen on click', async () => {
  it('Sign up button should throw an Error when the passwords don\'t match', async () => {
    email.value = 'example@gmail.com';
    password.value = '123456';
    passwordConfirm.value = '123';
    // const response = await buttonSignup.click();

    // expect(await buttonSignup.click())
  });

  // expect(fetch).toHaveBeenCalledTimes(1);
  //     expect(fetch).toHaveBeenCalledWith('/path/to/data.json');
  //     expect(result).toEqual(mockResponse);

  // check the fetch
  // check the res.blob
  // check the signUpUser
  // check the navigateTo
  // expect(fetchMock).toHaveBeenCalledWith('image-test');
  // expect(signUpUser).toHaveBeenCalled();
  // expect(navigateToMock).toHaveBeenCalledWith('/feed');

  /** Test para las función de cargar la data */
  // describe('All test of get data', (done) => {
  //   it('is a function', () => {
  //     expect(typeof dataJson).toBe('function');
  //   });

  //   global.fetch = jest.fn(); // Así se crea un mock de una función
  //   it('should return parsed JSON data if response status is 200', async () => {
  //     const mockResponse = JSON.parse(DATA_TEMP);
  //     const mockJsonPromise = Promise.resolve(mockResponse);
  //     const mockFetchPromise = Promise.resolve({
  //       status: 200,
  //       json: () => mockJsonPromise,
  //     });

  //     fetch.mockImplementation(() => mockFetchPromise);

  //     const result = await dataJson('/path/to/data.json');

  //     expect(fetch).toHaveBeenCalledTimes(1);
  //     expect(fetch).toHaveBeenCalledWith('/path/to/data.json');
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('throws an error when response status is not 200', async () => {
  //     const mockResponse = {
  //       status: 404,
  //       json: jest.fn().mockResolvedValue({ message: 'not found' }),
  //     };
  //     jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

  //     await expect(dataJson('/path/to/data.json')).rejects.toThrow('Hubo un problema accediendo al dataset.');
  //     expect(global.fetch).toHaveBeenCalledWith('/path/to/data.json');
  //   });
  // });

  // // This part is verified by the input type email and password and required
  //   it('The email and password can't be empty string', () => {
  //     const buttonLog = loginElement.querySelector('.login-button');
  //     buttonLog.click();
  //     expect(navigateToMock).toHaveBeenCalledWith('/error');
  //   });

  //   it('The email must to be valid', () => {

  //   it('The password must to be at least 6 characters', () => {

  //   email already in use

  // too many requests
});
