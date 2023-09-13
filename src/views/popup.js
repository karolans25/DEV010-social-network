export const popup = async (message) => {
  const article = document.getElementById('root');
  const overlay = document.createElement('section');
  const dialog = document.createElement('dialog');
  const title = document.createElement('h2');

  overlay.className = 'overlay';
  overlay.style.display = 'flex';

  let strMessage = '';
  const posibilities = [
    'The user has been registered. Check your email to confirm the account',
    'The user has been logged',
    'The user has been registered and logged with',
    'The post has been created',
    'The post has been updated',
    'The post has been deleted',
    'The email to confirm your account has been sent',
    'The email to restore the password has been sent',
    'The comment has been published',
    'The comment has been deleted',
  ];
  if (typeof message !== 'undefined' && typeof message === 'string' && message !== '') {
    if (posibilities.includes(message)) {
      title.textContent = 'Well Done!';
      strMessage = message;
    } else {
      title.textContent = 'Firebase Error!';
      switch (message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          strMessage = 'Email already in use';
          break;
        case 'Firebase: Error (auth/passwords-not-match).':
          strMessage = 'The passwords don\'t match';
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          strMessage = 'Password should be at least 6 characters';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          strMessage = 'Invalid email';
          break;
        case 'Firebase: Error (auth/user-not-found).':
          strMessage = 'User not found';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          strMessage = 'Wrong password';
          break;
        case 'Firebase: Error (auth/too-many-requests).':
          strMessage = 'Too many requests. Try again later';
          break;
        case 'Firebase: Error (auth/cancelled-popup-request).':
          strMessage = 'The request was canceled';
          break;
        case 'Firebase: Error (auth/popup-blocked).':
          strMessage = 'The popup was blocked';
          break;
        case 'Firebase: Error (auth/popup-closed-by-user).':
          strMessage = 'The user has closed the popup';
          break;
        case 'Firebase: Error (auth/network-request-failed).':
          strMessage = 'Check your network connection';
          break;
        case 'Firebase: Error (auth/internal-error).':
          strMessage = 'Error in authentication';
          break;
        case 'Firebase: Error (auth/unauthorized-domain).':
          strMessage = 'Unauthorized domain';
          break;
        case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
          strMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later';
          break;
        case 'Firebase: Error ':
          strMessage = 'Firebase error';
          break;
        default:
          title.textContent = 'Error!';
          strMessage = message;
          break;
      }
    }
  }

  dialog.innerHTML = `<h3>${title.innerHTML}</h3><br>${strMessage} <br><h3>Click anyway to continue!</h3>`;
  dialog.addEventListener('click', () => {
    overlay.remove();
  });

  console.log(dialog.innerHTML);
  article.append(overlay);
  overlay.appendChild(dialog);

  if (dialog) {
    dialog.showModal();
  }

  return overlay;
};

// export default popup;
