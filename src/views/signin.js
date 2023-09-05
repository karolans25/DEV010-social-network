// import { signInAuth, signInAuthGoogle } from '../lib/auth';
import { signinHandler } from '../handlers/signinHandler';
import { popup } from './popup';

export const signin = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPass = document.createElement('label');
  const inputPass = document.createElement('input');
  const ops = document.createElement('section');
  const buttonSignInGoogle = document.createElement('button');
  const imgGoogle = document.createElement('img');
  const buttonSignIn = document.createElement('button');
  const buttonSignInGithub = document.createElement('button');
  const imgGithub = document.createElement('img');
  const recoverPass = document.createElement('a');
  const signUp = document.createElement('a');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  // section
  section.className = 'signin';

  // link back
  back.innerHTML = '👈 back';
  back.setAttribute('name', 'back');
  back.href = '/';

  // link sign up
  signUp.innerHTML = '👉 Sign Up';
  signUp.setAttribute('name', 'signup');
  signUp.href = '/signup';
  signUp.className = 'link';

  // link forgot password
  recoverPass.innerHTML = 'Forgot password ?';
  recoverPass.setAttribute('name', 'recover-pass');
  recoverPass.href = '/password';
  recoverPass.className = 'link';

  // image
  img.src = './assets/icons/gorra.png';
  img.alt = 'user icon';
  figure.append(img);

  // title
  title.textContent = 'Sign In';

  loadingContainer.id = 'loading-container';
  loadingGif.src = '../assets/icons/playground.gif';
  loadingGif.alt = 'loading';

  // form
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
  buttonSignIn.textContent = '👉 Sign In ';
  buttonSignIn.name = 'signin-submit';
  buttonSignIn.type = 'submit';
  imgGoogle.src = './assets/icons/Google.png';
  imgGithub.src = './assets/icons/Github.png';
  imgGoogle.alt = 'Google';
  imgGithub.alt = 'Github';
  imgGoogle.classList.add('img-google');
  imgGoogle.classList.add('img-github');

  form.append(labelEmail, inputEmail, labelPass, inputPass, buttonSignIn, recoverPass);

  form.addEventListener('submit', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      const res = await signinHandler.signin(inputEmail.value, inputPass.value);
      loadingContainer.style.display = 'none';
      popup(res);
      if (res === 'The user has been logged') {
        form.reset();
        navigateTo('/feed');
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  // sign in with Google
  ops.className = 'ops';
  buttonSignInGoogle.textContent = '';
  buttonSignInGoogle.id = 'google';
  buttonSignInGoogle.appendChild(imgGoogle);
  buttonSignInGoogle.addEventListener('click', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      const res = await signinHandler.signinGoogle();
      popup(res);
      if (res === 'The user has been logged') {
        navigateTo('/feed');
      }
      /*
      signInGoogle()
        .then((response) => {
          if (response.startsWith('The user has been registered and logged with email')) {
            form.reset();
            navigateTo('/feed');
            popup(response);
          }
        })// .then(() => navigateTo('/feed'))
        .catch((err) => popup(err.message));
        */
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  // sign in with Github
  buttonSignInGithub.textContent = '';
  buttonSignInGithub.id = 'github';
  buttonSignInGithub.appendChild(imgGithub);
  buttonSignInGithub.addEventListener('click', () => {
    // signInAuthGoogle();
    // navigateTo('/home');
  });

  ops.append(buttonSignInGoogle, buttonSignInGithub);
  section.append(back, figure, title, form, ops, signUp);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
};

// export default signin;
