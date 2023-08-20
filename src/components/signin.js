// import { signInAuth, signInAuthGoogle } from '../lib/auth';
import { signInUser, signInGoogle } from '../lib/index';
import popup from './popup';

function signin(navigateTo) {
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
  const buttonSignIn = document.createElement('button');
  const op1 = document.createElement('section');
  const buttonSignInGoogle = document.createElement('button');
  const op2 = document.createElement('section');
  const buttonSignInGithub = document.createElement('button');
  const recoverPass = document.createElement('a');
  const signUp = document.createElement('a');

  // section
  section.className = 'signin';

  // link back
  back.innerHTML = 'back';
  back.href = '/';

  // image
  img.src = './assets/icons/gorra.webp';
  img.alt = 'user icon';
  figure.append(img);

  // title
  title.textContent = 'Sign In';

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
  buttonSignIn.textContent = 'Sign In';
  buttonSignIn.type = 'submit';
  recoverPass.innerHTML = 'Forgot password ?';
  recoverPass.href = '/password';
  recoverPass.className = 'link';
  form.append(labelEmail, inputEmail, labelPass, inputPass, buttonSignIn, recoverPass);

  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      signInUser(inputEmail.value, inputPass.value)
        .then((response) => {
          popup(response);
          if (response === `The user has been logged with email ${inputEmail.value}`) {
            form.reset();
            navigateTo('/feed');
          }
        })
        .catch((err) => popup(err.message));
    } catch (err) {
      popup(err.message);
    }
  });

  // sign in with Google
  op1.className = 'google';
  buttonSignInGoogle.textContent = 'Sign In with Google';
  buttonSignInGoogle.addEventListener('click', (e) => {
    try {
      e.preventDefault();
      signInGoogle()
        .then((response) => {
          if (response.startsWith('The user has been registered and logged with email')) {
            form.reset();
            // navigateTo('/feed');
          }
          alert(response);
        }).then(() => navigateTo('/feed'))
        .catch((err) => console.log(err.message));
    } catch (err) {
      alert(err.message);
    }
  });
  op1.append(buttonSignInGoogle);

  // sign in with Github
  op2.className = 'github';
  buttonSignInGithub.textContent = 'Sign In with Github';
  buttonSignInGithub.addEventListener('click', () => {
    // signInAuthGoogle();
    // navigateTo('/home');
  });
  op2.append(buttonSignInGithub);

  // link sign up
  signUp.innerHTML = 'Sign Up';
  signUp.href = '/signup';
  signUp.className = 'link';
  section.append(back, figure, title, form, op1, op2, signUp);

  return section;
}

export default signin;
