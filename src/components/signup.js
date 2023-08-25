import { signUpUser } from '../lib/index';
import popup from './popup';

const signup = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const sectionFig = document.createElement('section');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const buttonLeft = document.createElement('button');
  const buttonRight = document.createElement('button');
  const imgUrl = document.createElement('input');
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

  // section
  section.className = 'signup';

  // link back
  back.innerHTML = 'back';
  back.href = '/signin';

  // const urls = [];
  // const storageRef = ref(storage, 'default');
  // listAll(storageRef).then((result) => {
  //   result.items.forEach((imageRef) => {
  //     getDownloadURL(imageRef).then((res) => urls.push(res))
  //       .catch((err) => console.log(err.message));
  //   });
  //   urls.forEach((item) => {
  //     img.src = item;
  //     img.alt = `icon ${urls.indexOf(item) + 1}`;
  //   });
  // }).catch((err) => err.message);

  // figure
  img.src = './assets/icons/nina.webp';
  img.alt = 'user icon';
  const caption = document.createElement('caption');
  caption.append(imgUrl);
  figure.append(img, caption);

  // button to update img
  imgUrl.type = 'file';
  imgUrl.id = 'imgUrl';
  imgUrl.value = '';
  imgUrl.setAttribute('accept', 'image/*');
  imgUrl.addEventListener('change', (e) => {
    // file = e.target.files[0];
    img.src = URL.createObjectURL(e.target.files[0]);
    // img.style.width = '162px';
    // img.style.height = '162px';
    img.style.borderRadius = '50%';
    // figure.style.padding = '0';
    // caption.style.position = 'relative';
    // caption.style.bottom = '-41.5%';
    // caption.style.right = '87%';
    // caption.style.height = '30px';

    // img.style.alignSelf = 'center';
  });
  sectionFig.className = 'sec-figure';
  buttonLeft.innerHTML = '<';
  buttonLeft.name = 'left';
  buttonRight.innerHTML = '>';
  buttonRight.name = 'right';
  sectionFig.append(buttonLeft, figure, buttonRight);

  buttonRight.addEventListener('click', () => { console.log('Right'); });
  buttonLeft.addEventListener('click', () => { console.log('Left'); });

  // title
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = 'Sign Up';

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
  inputPassConfirm.name = 'passCheck';
  inputPassConfirm.placeholder = 'Write password again';
  inputPassConfirm.type = 'password';
  inputPassConfirm.required = true;
  buttonSignUp.type = 'submit';

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

  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      if (inputPass.value === inputPassConfirm.value) {
        fetch(img.src).then((res) => res.blob()).then((blob) => {
          signUpUser(inputEmail.value, inputPass.value, inputName.value, blob)
            .then((response) => {
              if (response.includes('Check your email to confirm the account.')) {
                form.reset();
                popup(response);
                navigateTo('/signin');
              }
              // section.style.display = 'none';
              popup(response);
            })
            // }).then(() => navigateTo('/signin'))
            .catch((err) => { popup(err.message); });
        });
      } else {
        throw new Error('Firebase: Error (auth/passwords-not-match).');
      }
    } catch (err) { popup(err.message); }
  });

  section.append(back, sectionFig, title, form);

  return section;
};

export default signup;
