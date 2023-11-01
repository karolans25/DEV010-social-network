// import { signInAuth, signInAuthGoogle } from '../lib/auth';
// import { doc } from 'firebase/firestore';
import { signinHandler } from '../handlers/signinHandler';
import { popup } from './popup';

import imgLoading from '../assets/icons/playground.gif';
import imgAvatar from '../assets/icons/gorra.png';
import google from '../assets/icons/Google.png';
import github from '../assets/icons/Github.png';
import imgSignin from '../assets/icons/signin.png';
import imgSignup from '../assets/icons/signup.png';
import imgPass from '../assets/icons/password.png';

export const signin = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('button');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');

  const sectionEmail = document.createElement('section');
  const labelEmail = document.createElement('label');
  const spanEmail = document.createElement('span');
  const inputEmail = document.createElement('input');

  const sectionPass = document.createElement('section');
  const labelPass = document.createElement('label');
  const spanPass = document.createElement('span');
  const inputPass = document.createElement('input');

  const butSignin = document.createElement('img');
  const buttonSignIn = document.createElement('button');

  const ops = document.createElement('section');
  const buttonSignInGoogle = document.createElement('button');
  const imgGoogle = document.createElement('img');
  const buttonSignInGithub = document.createElement('button');
  const imgGithub = document.createElement('img');
  const extra = document.createElement('section');
  const recoverPass = document.createElement('button');
  const pass = document.createElement('img');
  const signup = document.createElement('img');
  const signUp = document.createElement('button');
  const labelOr = document.createElement('label');
  const sectionButtonsForm = document.createElement('section');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');
  // section
  section.className = 'signin';

  // link back
  // back.innerHTML = '👈 back';
  // back.innerHTML = 'back';
  back.innerHTML = '👈';
  back.setAttribute('name', 'back');
  // back.href = '/';
  back.classList.add('link', 'back');

  // link sign up
  // signUp.innerHTML = '';
  signup.src = imgSignup;
  signup.alt = 'sign-up';
  signUp.setAttribute('name', 'signup');
  // signUp.href = '/signup';
  signUp.className = 'link';

  // link forgot password
  pass.src = imgPass;
  pass.alt = 'sign-up';
  recoverPass.setAttribute('name', 'recover-pass');
  recoverPass.className = 'link';
  extra.classList.add('ops', 'extra');

  // image
  img.src = imgAvatar;
  img.alt = 'user icon';

  // title
  title.textContent = 'Sign In';

  // form
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
  // buttonSignIn.textContent = '👉 Sign In ';
  buttonSignIn.name = 'signin-submit';
  buttonSignIn.type = 'submit';
  butSignin.src = imgSignin;
  butSignin.alt = 'sign-in';
  imgGoogle.src = google;
  imgGithub.src = github;
  imgGoogle.alt = 'Google';
  imgGithub.alt = 'Github';
  imgGoogle.classList.add('img-google');
  imgGoogle.classList.add('img-github');
  sectionButtonsForm.style.display = 'flex';
  sectionButtonsForm.style.justifyContent = 'space-around';
  ops.className = 'ops';
  buttonSignInGoogle.textContent = '';
  buttonSignInGoogle.id = 'google';
  buttonSignInGithub.textContent = '';
  buttonSignInGithub.id = 'github';

  labelOr.textContent = '------- or Sign in with -------';
  labelOr.style.textAlign = 'center';
  labelOr.style.marginTop = '10px';
  labelOr.style.marginBottom = '10px';
  labelOr.style.color = 'var(--main-color)';
  // labelOr.style.fontFamily = 'Style Script';

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  back.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  recoverPass.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/password');
  });

  signUp.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/signup');
  });

  form.addEventListener('submit', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      const res = await signinHandler.signin(inputEmail.value, inputPass.value);
      popup(res);
      loadingContainer.style.display = 'none';
      if (res === 'The user has been logged') {
        form.reset();
        navigateTo('/feed');
        loadingContainer.style.display = 'none';
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  buttonSignInGoogle.addEventListener('click', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      const res = await signinHandler.signinGoogle();
      popup(res);
      if (res === 'The user has been logged') {
        navigateTo('/feed');
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  buttonSignInGithub.addEventListener('click', () => {
    // signInAuthGoogle();
    // navigateTo('/home');
  });

  signUp.appendChild(signup);
  recoverPass.appendChild(pass);

  labelEmail.appendChild(spanEmail);
  labelEmail.appendChild(inputEmail);
  sectionEmail.appendChild(labelEmail);
  sectionEmail.appendChild(signUp);

  labelPass.appendChild(spanPass);
  labelPass.appendChild(inputPass);
  sectionPass.appendChild(labelPass);
  sectionPass.appendChild(recoverPass);

  figure.append(img);
  buttonSignIn.appendChild(butSignin);
  // sectionButtonsForm.appendChild(buttonSignIn);
  // form.append(sectionEmail, sectionPass, sectionButtonsForm);
  form.append(sectionEmail, sectionPass, buttonSignIn);
  buttonSignInGoogle.appendChild(imgGoogle);
  buttonSignInGithub.appendChild(imgGithub);
  ops.append(buttonSignInGoogle, buttonSignInGithub);
  section.append(back, figure, title, form, labelOr, ops);
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

// export default signin;
