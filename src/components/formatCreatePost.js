import { auth } from '../lib/firebaseConfig';
import { createPost } from '../lib/user';
import popup from './popup';

function formatCreatePost() {
  const sectionCreatePost = document.createElement('section');

  const sectionTitle = document.createElement('section');
  const sectionPost = document.createElement('section');
  const sectionButton = document.createElement('section');
  const userName = document.createElement('h2');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const form = document.createElement('form');
  const postText = document.createElement('textarea');
  const postImg = document.createElement('img');
  const buttonAddImg = document.createElement('input');
  const buttonDeleteImage = document.createElement('button');
  const buttonPublish = document.createElement('input');

  sectionCreatePost.className = 'create-post';
  sectionTitle.className = 'header-post';
  sectionPost.className = 'body-post';
  sectionButton.className = 'foot-post';

  const user = auth.currentUser;
  userName.innerHTML = user.displayName;
  userName.innerHTML = 'Carolina Pulido';
  img.src = user.photoURL;

  postText.placeholder = 'What do you want to say?';
  buttonAddImg.type = 'file';
  buttonAddImg.setAttribute('accept', 'image/*');
  buttonAddImg.addEventListener('change', (e) => {
    postImg.src = URL.createObjectURL(e.target.files[0]);
    buttonAddImg.style.display = 'none';
    buttonDeleteImage.style.display = 'block';
  });
  buttonDeleteImage.textContent = 'Delete image';
  buttonDeleteImage.style.display = 'none';
  buttonDeleteImage.addEventListener('click', () => {
    // postImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    postImg.src = '';
    postImg.atl = '';
    buttonAddImg.style.display = 'block';
    buttonDeleteImage.style.display = 'none';
  });
  buttonPublish.type = 'submit';
  buttonPublish.textContent = 'Publish';
  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      console.log(postImg.src);
      console.log(postText.value);
      if (postImg.src !== '') {
        fetch(postImg.src).then((res) => res.blob()).then((blob) => {
          createPost(postText.value, blob)
            .then((response) => {
              if (response.includes('The post has been created')) {
                popup(response);
                form.reset();
              }
            })
            .catch((err) => { popup(err.message); });
        });
      } else {
        createPost(postText.value)
          .then((response) => {
            if (response.includes('The post has been created')) {
              popup(response);
              form.reset();
            }
          })
          .catch((err) => { popup(err.message); });
      }
    } catch (err) { popup(err.message); }
  });

  sectionCreatePost.style.background = 'transparent';
  sectionCreatePost.style.height = '340px';
  sectionTitle.style.background = 'transparent';
  sectionPost.style.background = 'transparent';
  sectionButton.style.background = 'transparent';
  form.style.background = 'transparent';
  form.style.background = 'var(--contrast-color)';
  form.style.boxShadow = '0.5rem 0.5rem var(--moving-things-color)';
  form.style.borderRadius = '15px';
  sectionButton.style.height = '70px';
  sectionCreatePost.style.background = 'var(--contrast-color)';
  sectionCreatePost.style.background = 'transparent';
  sectionPost.style.width = '100%';
  sectionPost.style.maxHeight = '200px';
  img.style.width = '60px';
  img.style.height = '60px';
  img.style.borderRadius = '50%';
  figure.style.width = '60px';
  figure.style.height = '60px';
  postText.style.width = '235px';
  postText.style.height = '100px';
  postText.style.padding = '10px 10px 10px 10px';
  // postImg.style.background = 'transparent';
  postImg.style.width = '100px';
  postImg.style.height = '100px';
  sectionTitle.style.height = '70px';
  sectionPost.style.display = 'flex';
  sectionPost.style.flexFlow = 'row wrap';

  figure.append(img);
  sectionTitle.append(figure, userName);
  sectionPost.append(postText, postImg, buttonAddImg, buttonDeleteImage);
  form.append(sectionTitle, sectionPost, buttonPublish);
  sectionCreatePost.append(form);

  return sectionCreatePost;
}

export default formatCreatePost;
