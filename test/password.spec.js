// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { sendPasswordResetEmailAuth } from '../src/lib/index';

import password from '../src/components/password';

const { window } = new JSDOM();
global.document = window.document;

// Mock for navigateTo
const navigateToMock = jest.fn();

describe('Sign In Component', () => {
  let passwordComponent;
  let aBack;
  let email;
  let buttonRecoverPassword;

  // Configure the Init Component before each test
  beforeEach(() => {
    passwordComponent = password(navigateToMock);
    aBack = passwordComponent.querySelector('a');
    email = passwordComponent.querySelector('[type="email"]');
    buttonRecoverPassword = passwordComponent.querySelector('[type="submit"]');
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('must be a function', () => {
    expect(typeof password).toBe('function');
  });

  it('signin function should return a section element', () => {
    const section = password();
    expect(section.tagName).toBe('SECTION');
  });

  // back link
  it('back link should redirect to "Sign in" screen on click on "back" link ', () => {
    expect(aBack.getAttribute('href')).toBe('/signin');
  });

  // sign in button
  it('recover password button should redirect to "Sign in" screen on click on "Recover password" button with email', async () => {
    buttonRecoverPassword.click();
    await Promise.resolve();

    expect(sendPasswordResetEmailAuth).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/signin');
  });

  // user not found
});
