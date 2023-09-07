import { signupHandler } from '../handlers/signupHandler';
import { popup } from './popup';

import gifLoading from '../assets/icons/playground.gif';
import imgAvatar from '../assets/icons/nina.png';

export const signup = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('button');
  const sectionFig = document.createElement('section');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const buttonLeft = document.createElement('button');
  const buttonRight = document.createElement('button');
  const iconAddFile = document.createElement('img');
  const file = document.createElement('input');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassConfirm = document.createElement('input');
  const labelName = document.createElement('label');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const labelPassConfirm = document.createElement('label');
  const buttonSignUp = document.createElement('button');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  // section
  section.className = 'signup';

  // link back
  // back.innerHTML = '👈 back';
  back.innerHTML = 'back';
  iconAddFile.className = 'icon-add-file';
  file.classList.add('file', 'file-upload', 'file-signup');
  // back.href = '/signin';
  back.name = 'back';
  back.classList.add('link', 'back');
  figure.style.display = 'grid';
  file.name = 'file';
  file.type = 'file';
  file.setAttribute('accept', 'image/*');
  img.src = imgAvatar;
  img.alt = 'user icon';
  sectionFig.className = 'sec-figure';
  buttonLeft.innerHTML = '◀️';
  buttonLeft.name = 'left';
  buttonLeft.style.padding = '0';
  buttonRight.innerHTML = '▶️';
  buttonRight.name = 'right';
  buttonRight.style.padding = '0';
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = '👉 Sign Up';
  loadingContainer.id = 'loading-container';
  loadingGif.src = gifLoading;
  loadingGif.alt = 'loading';

  // form
  labelName.innerHTML = 'Display Name:';
  labelName.htmlFor = inputName.name;
  inputName.name = 'name';
  inputName.placeholder = 'Write display name';
  inputName.type = 'text';
  inputName.required = false;
  labelEmail.innerHTML = 'Email: ';
  labelEmail.htmlFor = inputEmail.name;
  inputEmail.name = 'email';
  inputEmail.placeholder = 'Write email';
  inputEmail.type = 'email';
  inputEmail.required = true;
  labelPass.innerHTML = 'Password: ';
  labelPass.htmlFor = inputPass.name;
  inputPass.name = 'pass';
  inputPass.placeholder = 'Write password';
  inputPass.type = 'password';
  inputPass.required = true;
  labelPassConfirm.innerHTML = 'Confirm Password: ';
  labelPassConfirm.htmlFor = inputPassConfirm.name;
  inputPassConfirm.name = 'pass-check';
  inputPassConfirm.placeholder = 'Write password again';
  inputPassConfirm.type = 'password';
  inputPassConfirm.required = true;
  buttonSignUp.type = 'submit';

  back.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/signin');
  });

  buttonRight.addEventListener('click', () => { console.log('Right'); });

  buttonLeft.addEventListener('click', () => { console.log('Left'); });

  file.addEventListener('change', (e) => {
    img.src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';
  });

  form.addEventListener('submit', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      if (inputPass.value === inputPassConfirm.value) {
        // eslint-disable-next-line max-len
        const res = await signupHandler.createUser(inputEmail.value, inputPass.value, img.src, inputName.value);
        loadingContainer.style.display = 'none';
        popup(res);
        if (res === 'The user has been registered. Check your email to confirm the account') {
          form.reset();
          navigateTo('/signin');
          popup(res);
        }
      } else {
        loadingContainer.style.display = 'none';
        throw new Error('Firebase: Error (auth/passwords-not-match).');
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  form.append(
    labelName,
    inputName,
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassConfirm,
    inputPassConfirm,
    buttonSignUp,
  );
  figure.append(img, iconAddFile, file);
  sectionFig.append(buttonLeft, figure, buttonRight);
  section.append(back, sectionFig, title, form);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
};

// export default signup;
