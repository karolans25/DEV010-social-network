import { signupHandler } from '../../handlers/signupHandler';
import { popup } from '../popup';

import gifLoading from '../../assets/icons/playground.gif';
import imgAvatar from '../../assets/icons/nina.png';
import imgIconAddFile from '../../assets/icons/file.png';
import imgSignup from '../../assets/icons/signup.png';

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

  const sectionUserName = document.createElement('section');
  const labelName = document.createElement('label');
  const spanName = document.createElement('span');
  const inputName = document.createElement('input');

  const sectionEmail = document.createElement('section');
  const labelEmail = document.createElement('label');
  const spanEmail = document.createElement('span');
  const inputEmail = document.createElement('input');

  const sectionPass = document.createElement('section');
  const labelPass = document.createElement('label');
  const spanPass = document.createElement('span');
  const inputPass = document.createElement('input');

  const sectionPassConfirm = document.createElement('section');
  const labelPassConfirm = document.createElement('label');
  const spanPassConfirm = document.createElement('span');
  const inputPassConfirm = document.createElement('input');

  const buttonSignUp = document.createElement('button');
  const imgSignUp = document.createElement('img');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  // section
  section.className = 'signup';

  // link back
  // back.innerHTML = '👈 back';
  // back.innerHTML = 'back';
  back.innerHTML = '👈';
  iconAddFile.className = 'icon-add-file';
  iconAddFile.src = imgIconAddFile;
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
  imgSignUp.src = imgSignup;
  imgSignUp.alt = 'sign up';
  // buttonSignUp.textContent = '👉 Sign Up';
  loadingContainer.id = 'loading-container';
  loadingGif.src = gifLoading;
  loadingGif.alt = 'loading';

  // form
  // labelName.innerHTML = 'Display Name:';
  // labelName.htmlFor = inputName.name;
  spanName.textContent = 'Write display name';
  inputName.name = 'name';
  // inputName.placeholder = 'Write display name';
  inputName.type = 'text';
  inputName.required = false;
  // labelEmail.innerHTML = 'Email: ';
  // labelEmail.htmlFor = inputEmail.name;
  spanEmail.textContent = 'Write email *';
  inputEmail.name = 'email';
  // inputEmail.placeholder = 'Write email';
  inputEmail.type = 'email';
  inputEmail.required = true;
  // labelPass.innerHTML = 'Password: ';
  // labelPass.htmlFor = inputPass.name;
  spanPass.textContent = 'Write password *';
  inputPass.name = 'pass';
  // inputPass.placeholder = 'Write password';
  inputPass.type = 'password';
  inputPass.required = true;
  // labelPassConfirm.innerHTML = 'Confirm Password: ';
  // labelPassConfirm.htmlFor = inputPassConfirm.name;
  spanPassConfirm.textContent = 'Write password again *';
  inputPassConfirm.name = 'pass-check';
  // inputPassConfirm.placeholder = 'Write password again';
  inputPassConfirm.type = 'password';
  inputPassConfirm.required = true;
  buttonSignUp.type = 'submit';
  // form.setAttribute('autocomplete', 'off');

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

  labelName.appendChild(spanName);
  labelName.appendChild(inputName);
  sectionUserName.appendChild(labelName);

  labelEmail.appendChild(spanEmail);
  labelEmail.appendChild(inputEmail);
  sectionEmail.appendChild(labelEmail);

  labelPass.appendChild(spanPass);
  labelPass.appendChild(inputPass);
  sectionPass.appendChild(labelPass);

  labelPassConfirm.appendChild(spanPassConfirm);
  labelPassConfirm.appendChild(inputPassConfirm);
  sectionPassConfirm.appendChild(labelPassConfirm);

  buttonSignUp.appendChild(imgSignUp);

  form.append(sectionUserName, sectionEmail, sectionPass, sectionPassConfirm, buttonSignUp);

  figure.append(img, iconAddFile, file);
  sectionFig.append(buttonLeft, figure, buttonRight);
  section.append(back, sectionFig, title, form);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.onfocus = () => {
      input.previousElementSibling.classList.add('top');
      input.previousElementSibling.classList.add('focus');
      input.parentNode.classList.add('focus');
    };
    input.onblur = () => {
      input.value = input.value.trim();
      if (input.value.length === 0) {
        input.previousElementSibling.classList.remove('top');
      }
      input.previousElementSibling.classList.remove('focus');
      // previus.parentNode.classList.remove('top');
      input.parentNode.classList.remove('focus');
    };
  });

  return section;
};

// export default signup;
