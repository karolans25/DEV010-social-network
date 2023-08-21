// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { signUpUser } from '../src/lib/index';

import signup from '../src/components/signup';

const { window } = new JSDOM();
global.document = window.document;

// Mock for navigateTo
const navigateToMock = jest.fn();

// Mock for fetch
const fetchMock = jest.fn();

describe('Sign Up Component', () => {
  let signupComponent;
  let aBack;
  let buttonLeft;
  let buttonRight;
  let inputFile;
  let name;
  let email;
  let password;
  let passwordConfirm;
  let buttonSignup;

  // Configure the Init Component before each test
  beforeEach(() => {
    signupComponent = signup(navigateToMock);
    aBack = signupComponent.querySelector('a');
    buttonLeft = signupComponent.querySelector('[name="left"]');
    buttonRight = signupComponent.querySelector('[name="right"]');
    inputFile = signupComponent.querySelector('[type="file"]');
    name = signupComponent.querySelector('[type="text"]');
    email = signupComponent.querySelector('[type="email"]');
    password = signupComponent.querySelectorAll('[type="password"]')[0];
    passwordConfirm = signupComponent.querySelectorAll('[type="password"]')[1];
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

  // choose file

  // sign up button
  it('sign up button should redirect to "Sign In" screen on click on "Sign up" button', async () => {
    buttonSignup.click();
    await Promise.resolve();

    // check the fetch
    // check the res.blob
    // check the signUpUser
    // check the navigateTo
    expect(fetchMock).toHaveBeenCalledWith('image-test');
    expect(signUpUser).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  // // This part is verified by the input type email and password and required
  //   it('The email and password can't be empty string', () => {
  //     const buttonLog = loginElement.querySelector('.login-button');
  //     buttonLog.click();
  //     expect(navigateToMock).toHaveBeenCalledWith('/error');
  //   });

  //   it('The email must to be valid', () => {

  //   it('The password and password confirm must to be equal', () => {

  //   it('The password must to be at least 6 characters', () => {

  //   email already in use

  // too many requests
});
