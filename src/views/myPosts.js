import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
import { feedHandler } from '../handlers/feedHandler';
import { popup } from './popup';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton);
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (file, id, container) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  if (file instanceof File) {
    thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file)})`);
  } else {
    thumbnail.setAttribute('style', `background-image: url(${file})`);
  }
  // const container = document.querySelector('.edit-post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

const fillPostData = (urls, container) => {
  if (Array.isArray(urls)) {
    if (urls.length === 0) {
      container.style.display = 'none';
    } else {
      container.style.display = 'grid';
    }
    urls.forEach((url) => {
      const img = document.createElement('img');
      img.className = 'post-img';
      img.src = url;
      img.alt = 'img post';
      container.appendChild(img);
    });
  }
};

export const myPosts = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const sectionFormatCreatePost = formatCreatePost();
  const sectionFormatGetAllPost = document.createElement('section');
  const sectionGetAllPosts = document.createElement('section');

  section.classList.value = 'home';
  subSection.className = 'myPosts';
  sectionGetAllPosts.className = 'get-posts';
  sectionGetAllPosts.innerHTML = '';
  title.innerHTML = 'Caro PG - My Posts';

  const posts = await feedHandler.getAllMyPost();
  alert(posts.length);
  posts.forEach(async (item) => {
    alert(item.text);
    const formatForEachPost = await formatPost(item);

    const initButtons = document.createElement('section');
    const threePoint = document.createElement('paragraph');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const updateButtons = document.createElement('section');
    const iconAddFile = document.createElement('img');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const textarea = document.createElement('textarea');
    const file = document.createElement('input');

    let formData = new FormData();

    initButtons.classList.add('init-buttons', item.id);
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button', item.id);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button', item.id);
    threePoint.textContent = '...';
    updateButtons.classList.add('edit-file-update');

    updateButtons.appendChild(iconAddFile);
    updateButtons.appendChild(file);
    updateButtons.appendChild(saveButton);
    updateButtons.appendChild(cancelButton);

    initButtons.appendChild(editButton);
    initButtons.appendChild(deleteButton);

    const createdAt = formatForEachPost.querySelector('.created-timestamp');
    const postText = formatForEachPost.querySelector('p.post-text');
    const postFigureContainer = formatForEachPost.querySelector('.post-figure');

    createdAt.before(initButtons);

    editButton.addEventListener('click', async () => {
      alert(item.text);
      createdAt.style.display = 'none';
      postText.style.display = 'none';
      postFigureContainer.style.display = 'block';
      updateButtons.style.display = 'grid';
      textarea.style.display = 'block';
      initButtons.append(updateButtons);
      initButtons.append(textarea);

      textarea.classList.add('post-text');
      textarea.innerHTML = postText.textContent;
      saveButton.textContent = 'Save';
      cancelButton.textContent = 'Cancel';
      iconAddFile.className = 'icon-add-file';
      file.className = 'file-upload';
      saveButton.classList.add('save-button', item.id);

      file.type = 'file';
      file.setAttribute('accept', 'image/*,video/*');
      file.setAttribute('multiple', 'true');
      file.name = 'file[]';
      file.classList.add('file', 'edit-file-post');

      postFigureContainer.innerHTML = '';
      item.URL.forEach((url) => {
        const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
        createThumbnail(url, thumbnailId, postFigureContainer);
        formData.append(thumbnailId, url);
      });

      // Listener for close button in images
      postFigureContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
          e.target.parentNode.remove(); // Better than a loop through the thumbnails
          formData.delete(e.target.parentNode.dataset.id);
        }
      });

      // Possibility to upload new images
      file.addEventListener('change', (e) => {
        for (let iterator = 0; iterator < e.target.files.length; iterator++) {
          const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
          createThumbnail(e.target.files[iterator], thumbnailId, postFigureContainer);
          formData.append(thumbnailId, e.target.files[iterator]);
        }
        e.target.value = '';
      });

      saveButton.addEventListener('click', () => {
        if (textarea.value !== '') {
          console.log('Save************');
          formData.forEach((value, key) => {
            console.log(key, value);
          });
          formData.append('text', textarea.value);
          const res = feedHandler.updatePost(formData, item.id);

          updateButtons.style.display = 'none';
          textarea.style.display = 'none';
          createdAt.style.display = 'block';
          postText.style.display = 'block';
          postFigureContainer.innerHTML = '';
          fillPostData(item.URL, postFigureContainer);
          formData.forEach((value, key) => formData.delete(key));
        } else {
          popup('You haven\'t writen anything. Please write something for your post');
        }
      });

      cancelButton.addEventListener('click', () => {
        updateButtons.style.display = 'none';
        textarea.style.display = 'none';
        createdAt.style.display = 'block';
        postText.style.display = 'block';
        postFigureContainer.innerHTML = '';
        fillPostData(item.URL, postFigureContainer);
        formData.forEach((value, key) => formData.delete(key));
      });
    });

    deleteButton.addEventListener('click', () => {
      feedHandler.deletePost(item.id);
    });

    formatForEachPost.classList.add('container-found-post', item.id);
    sectionGetAllPosts.append(formatForEachPost);
  });

  // if (item.idUser === auth.currentUser.uid) {
  //   const initButtons = document.createElement('section');
  //   const threePoint = document.createElement('paragraph');
  //   const editButton = document.createElement('button');
  //   const deleteButton = document.createElement('button');
  //   const updateButtons = document.createElement('section');
  //   const iconAddFile = document.createElement('img');
  //   const saveButton = document.createElement('button');
  //   const cancelButton = document.createElement('button');
  //   const textarea = document.createElement('textarea');
  //   const file = document.createElement('input');

  //   const formData = new FormData();

  //   initButtons.classList.add('init-buttons', item.id);
  //   editButton.textContent = 'Edit';
  //   editButton.classList.add('edit-button', item.id);
  //   deleteButton.textContent = 'Delete';
  //   deleteButton.classList.add('delete-button', item.id);
  //   threePoint.textContent = '...';
  //   updateButtons.classList.add('edit-file-update');

  //   updateButtons.appendChild(iconAddFile);
  //   updateButtons.appendChild(file);
  //   updateButtons.appendChild(saveButton);
  //   updateButtons.appendChild(cancelButton);

  //   editButton.addEventListener('click', () => {
  //     createdAt.style.display = 'none';
  //     postText.style.display = 'none';
  //     updateButtons.style.display = 'grid';
  //     textarea.style.display = 'block';
  //     initButtons.append(updateButtons);
  //     initButtons.append(textarea);

  //     textarea.classList.add('post-text');
  //     saveButton.textContent = 'Save';
  //     cancelButton.textContent = 'Cancel';
  //     iconAddFile.className = 'icon-add-file';
  //     file.className = 'file-upload';
  //     saveButton.classList.add('save-button', item.id);

  //     file.type = 'file';
  //     file.setAttribute('accept', 'image/*,video/*');
  //     file.setAttribute('multiple', 'true');
  //     file.name = 'file[]';
  //     file.classList.add('file', 'edit-file-post');

  //     // Upload the data of the post
  //     getDoc(doc(db, 'post', item.id))
  //       .then((document) => {
  //         textarea.value = document.data().text;
  //         const urls = document.data().URL;
  //         postFigureContainer.innerText = '';
  //         for (let i = 0; i < urls.length; i++) {
  //           const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
  //           createThumbnail(urls[i], thumbnailId, postFigureContainer);
  //           formData.append(thumbnailId, urls[i]);
  //         }
  //       });

  //     postFigureContainer.addEventListener('click', (e) => {
  //       if (e.target.classList.contains('close-button')) {
  //         e.target.parentNode.remove(); // Better than a loop through the thumbnails
  //         formData.delete(e.target.parentNode.dataset.id);
  //       }
  //     });

  //     // Possibility to upload new images
  //     file.addEventListener('change', (e) => {
  //       for (let iterator = 0; iterator < e.target.files.length; iterator++) {
  //         const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
  //         createThumbnail(e.target.files[iterator], thumbnailId, postFigureContainer);
  //         formData.append(thumbnailId, e.target.files[iterator]);
  //       }
  //       e.target.value = '';
  //     });

  //     // Listener for close button in images
  //     postFigureContainer.addEventListener('click', (e) => {
  //       if (e.target.classList.contains('close-button')) {
  //         e.target.parentNode.remove(); // Better than a loop through the thumbnails
  //         formData.delete(e.target.parentNode.dataset.id);
  //       }
  //     });

  //     saveButton.addEventListener('click', () => {
  //       if (textarea.value !== '') {
  //         console.log('Save************');
  //         formData.append('text', textarea.value);
  //         const res = updatePost(formData, item.id);
  //         console.log(res);
  //       } else {
  //         popup('You haven\'t writen anything. Please write something for your post');
  //       }
  //     });

  //     cancelButton.addEventListener('click', () => {
  //       updateButtons.style.display = 'none';
  //       textarea.style.display = 'none';
  //       createdAt.style.display = 'block';
  //       postText.style.display = 'block';
  //       postFigureContainer.innerHTML = '';
  //       fillPostData(item.URL, postFigureContainer);
  //     });
  //   });
  //   deleteButton.addEventListener('click', () => {
  //     deletePost(item.id);
  //   });

  //   threePoint.appendChild(editButton);
  //   threePoint.appendChild(deleteButton);
  //   initButtons.appendChild(threePoint);
  //   sectionPostData.append(initButtons);
  // }

  sectionFormatGetAllPost.append(sectionGetAllPosts);
  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  section.append(subSection, nav);

  return section;
};

// export default myPosts;
