// import { signInAuth, signInAuthGoogle } from '../lib/auth';

function signin(navigateTo) {
  const section = document.createElement('section');
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

  // image
  img.src = './assets/icons/gorra.png';
  img.alt = 'user img';
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
  form.append(labelEmail, inputEmail, labelPass, inputPass, buttonSignIn, recoverPass);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // try {
    //   const credential = await signInAuth(inputEmail.value, inputPass.value);
    //   console.log(credential);
    // } catch (err) {
    //   console.error(err);
    // }
    navigateTo('/');
  });

  // sign in with Google
  op1.className = 'google';
  buttonSignInGoogle.textContent = 'Sign In with Google';
  buttonSignInGoogle.addEventListener('click', () => {
    // signInAuthGoogle();
    // navigateTo('/home');
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

  // links
  recoverPass.innerHTML = 'Recover password';
  recoverPass.href = '/password';
  signUp.innerHTML = 'Sign Up';
  signUp.href = '/signup';

  section.append(figure, title, form, op1, op2, signUp);

  return section;
}

export default signin;
