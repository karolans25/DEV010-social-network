function popup(message) {
  const article = document.getElementById('root');
  const overlay = document.createElement('section');
  const card = document.createElement('section');
  const header = document.createElement('header');
  const messageSection = document.createElement('section');
  const footer = document.createElement('footer');
  const title = document.createElement('h2');
  const p = document.createElement('p');

  overlay.className = 'overlay';
  overlay.style.display = 'flex';
  card.className = 'popup';

  header.className = 'card-header';
  messageSection.className = 'card-body';
  footer.className = 'card-footer';

  title.innerHTML = 'Error';
  // card.style.display = 'grid';
  const buttonOk = document.createElement('button');
  buttonOk.value = 'Ok';
  buttonOk.className = 'ok';
  buttonOk.addEventListener('click', () => {
    overlay.style.display = 'none';
    console.log(article.children);
    // article.remove(article.children[1]);
  });

  if (typeof message !== 'undefined') {
    if (message.includes('Firebase')) {
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
        case 'Firebase:':
          // There's an error about requiered an recent session
          // alert('Another error');
          p.innerHTML = 'Another error';
          break;
        default:
          // alert(message);
          p.innerHTML = message;
          break;
      }
    } else if (message.includes('?')) {
      card.className = 'confirm';
    } else {
      card.className = 'error';
      p.innerHTML = message;
    }
  }

  header.append(title);
  messageSection.append(p);
  footer.append(buttonOk);
  card.appendChild(header);
  card.appendChild(messageSection);
  card.appendChild(footer);
  overlay.append(card);
  article.append(overlay);

  return overlay;
}

export default popup;
