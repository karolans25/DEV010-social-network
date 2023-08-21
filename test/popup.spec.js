// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

import popup from '../src/components/popup';

const { window } = new JSDOM();
global.document = window.document;

describe('Pop-up Component', () => {
  let popupComponent;
  let message;
  let pCardBody;
  let buttonOk;

  // Configure the Init Component before each test
  beforeEach(() => {
    message = 'test-message';
    popupComponent = popup(message);
    pCardBody = popupComponent.querySelector('.card-body p');
    buttonOk = popupComponent.querySelector('.ok');
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('must be a function', () => {
    expect(typeof popup).toBe('function');
  });

  it('popup function should return a section element', () => {
    const section = popup();
    expect(section.tagName).toBe('SECTION');
  });

  //   if (typeof message !== 'undefined') {
  //     if (message.includes('Firebase')) {
  //       switch (message) {
  //         case 'Firebase: Error (auth/email-already-in-use).':
  //           // alert('Email already in use');
  //           p.innerHTML = 'Email already in use';
  //           break;
  //         case 'Firebase: Error (auth/passwords-not-match).':
  //           // alert('The passwords don\'t match');
  //           p.innerHTML = 'The passwords don\'t match';
  //           break;
  //         case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
  //           // alert('Password should be at least 6 characters');
  //           p.innerHTML = 'Password should be at least 6 characters';
  //           break;
  //         case 'Firebase: Error (auth/invalid-email).':
  //           // alert('Invalid email');
  //           p.innerHTML = 'Invalid email';
  //           break;
  //         case 'Firebase: Error (auth/user-not-found).':
  //           // alert('User not found');
  //           p.innerHTML = 'User not found';
  //           break;
  //         case 'Firebase: Error (auth/wrong-password).':
  //           // alert('Wrong password');
  //           p.innerHTML = 'Wrong password';
  //           break;
  //         case 'Firebase: Error (auth/too-many-requests).':
  //           // alert('Too many requests');
  //           p.innerHTML = 'Too many requests';
  //           break;
  //         case 'Firebase: Error ':
  //           // There's an error about requiered an recent session
  //           // alert('Another error');
  //           p.innerHTML = 'Another error';
  //           break;
  //         default:
  //           // alert(message);
  //           p.innerHTML = message;
  //           break;
  //       }
  //       ops.append(buttonOk);
  //     } else if (message.includes('?')) {
  //       card.className = 'confirm';
  //       const buttonCancel = document.createElement('button');
  //       buttonCancel.textContent = 'Cancel';
  //       buttonCancel.className = 'cancel';
  //       buttonOk.addEventListener('click', () => {
  //         overlay.style.display = 'none';
  //       });
  //       buttonCancel.addEventListener('click', () => {
  //         overlay.style.display = 'none';
  //       });
  //       ops.append(buttonOk, buttonCancel);
  //     } else {
  //       card.className = 'error';
  //       p.innerHTML = message;
  //       ops.append(buttonOk);
  //     }
  //   }
});
