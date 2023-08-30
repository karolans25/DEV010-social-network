// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { signInUser, signInGoogle } from '../src/lib/index';

import signin from '../src/components/signin';

const { window } = new JSDOM();
global.document = window.document;

// Mock for navigateTo
const navigateToMock = jest.fn();

describe('Sign In Component', () => {
  let signinComponent;
  let aBack;
  let email;
  let password;
  let buttonSignin;
  let aPassword;
  let buttonGoogle;
  let buttonGithub;
  let aSignup;

  // Configure the Init Component before each test
  beforeEach(() => {
    signinComponent = signin(navigateToMock);
    aBack = signinComponent.querySelector('a');
    email = signinComponent.querySelectorAll('[type="email"]');
    password = signinComponent.querySelectorAll('[type="password"]');
    buttonSignin = signinComponent.querySelector('[type="submit"]');
    aPassword = signinComponent.querySelectorAll('.link')[0];
    buttonGoogle = signinComponent.querySelector('#google-button');
    buttonGithub = signinComponent.querySelector('#github-button');
    aSignup = signinComponent.querySelectorAll('.link')[1];
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('must be a function', () => {
    expect(typeof signin).toBe('function');
  });

  it('signin function should return a section element', () => {
    const section = signin();
    expect(section.tagName).toBe('SECTION');
  });

  // back link
  it('back link should redirect to "Init" screen on click on "back" link ', () => {
    expect(aBack.getAttribute('href')).toBe('/');
  });

  // recover password link
  it('recover password link should redirect to "Recover password" screen on click on "forgot password?" link ', () => {
    expect(aPassword.getAttribute('href')).toBe('/password');
  });

  // sign up link
  it('sign up link should redirect to "Sign up" screen on click on "Sign up" link ', () => {
    expect(aSignup.getAttribute('href')).toBe('/signup');
  });

  // sign in button
  it('sign in button should redirect to "Feed" screen on click on "Sign in" button with email and password', async () => {
    buttonSignin.click();
    await Promise.resolve();

    expect(signInUser).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  // // This part is verified by the input type email and password and required
  //   it('The email and password can't be empty string', () => {
  //     const buttonLog = loginElement.querySelector('.login-button');
  //     buttonLog.click();
  //     expect(navigateToMock).toHaveBeenCalledWith('/error');
  //   });

  //   it('The email must to be valid', () => {

  //   it('The password must to be at least 6 characters', () => {

  // it('User not found')

  // it('Wrong password)

  // it('Too many requests')

  // sign in with Google button
  it('sign in with Google button should redirect to "Feed" screen on click on "Google" button ', async () => {
    buttonGoogle.click();
    await Promise.resolve();

    expect(signInGoogle).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  //   // sign in with Github button
  //   it('sign in Github should redirect to "Feed" screen on click on "Github" butt', async () => {
  //     buttonGithub.click();
  //     await Promise.resolve();

  //     expect(signInGithub).toHaveBeenCalled();
  //     expect(navigateToMock).toHaveBeenCalledWith('/feed');
  //   });
});
