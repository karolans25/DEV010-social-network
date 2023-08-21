function popup(message) {
  const article = document.getElementById('root');
  const overlay = document.createElement('section');
  const card = document.createElement('section');
  const header = document.createElement('header');
  const messageSection = document.createElement('section');
  const footer = document.createElement('footer');
  const title = document.createElement('h2');
  const p = document.createElement('p');
  const ops = document.createElement('section');
  const buttonOk = document.createElement('button');

  overlay.className = 'overlay';
  overlay.style.display = 'flex';

  card.className = 'popup';
  header.className = 'card-header';
  messageSection.className = 'card-body';
  footer.className = 'card-footer';

  title.innerHTML = 'Error';
  ops.className = 'ops';
  buttonOk.textContent = 'Ok';
  buttonOk.className = 'ok';
  buttonOk.addEventListener('click', () => {
    overlay.style.display = 'none';
    console.log(article.children);
    // article.remove(article.children[1]);
  });

  if (typeof message !== 'undefined') {
    if (message.includes('Firebase')) {
      title.innerHTML = 'Firebase Error';
      switch (message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          // alert('Email already in use');
          p.innerHTML = 'Email already in use';
          break;
        case 'Firebase: Error (auth/passwords-not-match).':
          // alert('The passwords don\'t match');
          p.innerHTML = 'The passwords don\'t match';
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          // alert('Password should be at least 6 characters');
          p.innerHTML = 'Password should be at least 6 characters';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          // alert('Invalid email');
          p.innerHTML = 'Invalid email';
          break;
        case 'Firebase: Error (auth/user-not-found).':
          // alert('User not found');
          p.innerHTML = 'User not found';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          // alert('Wrong password');
          p.innerHTML = 'Wrong password';
          break;
        case 'Firebase: Error (auth/too-many-requests).':
          // alert('Too many requests');
          p.innerHTML = 'Too many requests';
          break;
        case 'Firebase: Error ':
          // There's an error about requiered an recent session
          // alert('Another error');
          p.innerHTML = 'Another error';
          break;
        default:
          // alert(message);
          p.innerHTML = message;
          break;
      }
      ops.append(buttonOk);
    } else if (message.includes('?')) {
      card.className = 'confirm';
      const buttonCancel = document.createElement('button');
      buttonCancel.textContent = 'Cancel';
      buttonCancel.className = 'cancel';
      buttonOk.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
      buttonCancel.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
      ops.append(buttonOk, buttonCancel);
    } else {
      p.innerHTML = message;
      ops.append(buttonOk);
    }
  }

  header.append(title);
  messageSection.append(p, buttonOk);
  card.appendChild(header);
  card.appendChild(messageSection);
  card.appendChild(footer);
  overlay.append(card);
  article.append(overlay);

  return overlay;
}

export default popup;
