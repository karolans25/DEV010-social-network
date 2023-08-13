// import { signInAuth, signInAuthGoogle } from '../lib/auth';

function signin(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPass = document.createElement('label');
  const inputPass = document.createElement('input');
  const buttonSignIn = document.createElement('button');
  const buttonSignInGoogle = document.createElement('button');
  const aRecoverPassword = document.createElement('a');
  const aSignUp = document.createElement('a');

  title.textContent = 'Sign In';
  form.className = 'signin';

  labelEmail.innerHTML = 'Email: ';
  labelPass.innerHTML = 'Password: ';
  buttonReturn.textContent = 'Return to home';
  buttonSignIn.textContent = 'Sign In';
  buttonSignInGoogle.textContent = 'Sign In with Google';
  aRecoverPassword.innerHTML = 'Recover password';
  aSignUp.innerHTML = 'Sign Up';

  aRecoverPassword.href = '/password';
  aSignUp.href = '/signup';

  inputEmail.name = 'email';
  inputPass.name = 'pass';

  inputPass.placeholder = 'Write pass';
  inputEmail.placeholder = 'Write email';

  labelEmail.htmlFor = inputEmail.name;
  labelPass.htmlFor = inputPass.name;

  inputEmail.type = 'email';
  inputPass.type = 'password';
  buttonSignIn.type = 'submit';

  inputEmail.required = true;
  inputPass.required = true;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // try {
    //   const credential = await signInAuth(inputEmail.value, inputPass.value);
    //   console.log(credential);
    // } catch (err) {
    //   console.error(err);
    // }
    // navigateTo('/home');
  });

  buttonSignInGoogle.addEventListener('click', () => {
    // signInAuthGoogle();
    // navigateTo('/home');
  });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(labelEmail, inputEmail, labelPass, inputPass, buttonSignIn);
  section.append(title, form, buttonSignInGoogle, buttonReturn, aRecoverPassword, aSignUp);

  return section;
}

export default signin;
