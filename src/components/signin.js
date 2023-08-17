// import { signInAuth, signInAuthGoogle } from '../lib/auth';
import { signInUser } from '../lib/index';

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
  recoverPass.innerHTML = 'Recover password';
  recoverPass.href = '/password';
  form.append(labelEmail, inputEmail, labelPass, inputPass, buttonSignIn, recoverPass);

  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      signInUser(inputEmail.value, inputPass.value)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      // form.reset();
      // setTimeout(navigateTo('/signin'), 1000);
    } catch (err) {
      alert(err.message);
    }
  });
  //   signInAuth(inputEmail.value, inputPass.value)
  //     .then((credential) => {
  //       alert(`User logged with email ${credential.user.email}.`);
  //       setTimeout(navigateTo('/feed'), 1000);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });

  // sign in with Google
  op1.className = 'google';
  buttonSignInGoogle.textContent = 'Sign In with Google';
  buttonSignInGoogle.addEventListener('click', () => {
    try {
      // signInAuthGoogle()
      //   .then(() => {
      //     navigateTo('/feed');
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
    } catch (err) {
      console.error(err);
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

  section.append(back, figure, title, form, op1, op2, signUp);

  return section;
}

export default signin;
