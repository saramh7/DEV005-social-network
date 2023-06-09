import { getUserSession, googleLogout } from '../lib/auth.js';
import { home } from '../templates/home.js';
import { postTemplate } from '../templates/post.js';
import {
  getPost, addPost, likePost, unlikePost, deletePost, editPost,
} from '../lib/firestore.js';

let uidUserLogged;
let emailUserLogged;
let nameUserLogged;
let imageUserLogged;
let idPostEdited;

const validateSession = (navigateTo) => {
  getUserSession((user) => {
    if (user) {
      uidUserLogged = user.uid;
      emailUserLogged = user.email;
      nameUserLogged = user.displayName || '';
      imageUserLogged = user.photoURL || '';
    } else {
      navigateTo('/');
      return null;
    }
    return 'OK';
  });
};

const calculateDifference = (datePost, modified) => {
  const postDate = datePost.toDate().toLocaleDateString();
  const currentDate = new Date(Date.now()).toLocaleString().split(',')[0];
  const diffInHours = Math.floor((new Date(currentDate) - new Date(postDate)) / (1000 * 60 * 60));
  const modifiedText = modified ? '(Editado)' : '';
  if (diffInHours <= 1) { return `Hace unos instantes ${modifiedText}`; }
  if (diffInHours > 1 && diffInHours <= 24) {
    return `Hace ${diffInHours} Hrs. ${modifiedText}`;
  }
  if (diffInHours > 24 && diffInHours <= 48) { return `Ayer ${modifiedText}`; }
  return `Hace ${Math.floor(diffInHours / 24)} Días. ${modifiedText}`;
};

function Home(navigateTo) {
  const templatePost = document.createElement('template');
  templatePost.setAttribute('id', 'templatePost');
  templatePost.innerHTML = postTemplate;

  const homeContainer = document.createElement('div');
  homeContainer.classList.add('homeContainer');
  homeContainer.innerHTML = home;

  validateSession(navigateTo);

  const logoutBtn = homeContainer.querySelector('#logoutBtn');
  logoutBtn.addEventListener('click', () => {
    try {
      googleLogout();
      navigateTo('/');
      return;
    } catch (error) {
      console.warn('Home.js - logoutBtn - click - Error: ', error);
    }
  });
  // Funcion  que limita los caracteres para el texarea//
  const commentArea = homeContainer.querySelector('#comment');
  commentArea.addEventListener('keyup', () => {
    const characterCount = commentArea.value.length;
    const current = homeContainer.querySelector('#current');
    const maximum = homeContainer.querySelector('#maximum');
    current.textContent = characterCount;

    if (characterCount >= 300) {
      current.style.color = '#ce2e2e';
      current.style.fontWeight = 700;
      maximum.style.color = '#ce2e2e';
      maximum.style.fontWeight = 700;
    } else if (characterCount >= 250) {
      current.style.color = '#dbbc07';
      current.style.fontWeight = 'normal';
      maximum.style.color = '#ce2e2e';
      maximum.style.fontWeight = 700;
    } else {
      current.style.color = '#4b4c4d';
      current.style.fontWeight = 'normal';
      maximum.style.color = '#4b4c4d';
      maximum.style.fontWeight = 'normal';
    }

    return false;
  });

  const publishBtn = homeContainer.querySelector('#publishBtn');
  publishBtn.addEventListener('click', () => {
    const comment = homeContainer.querySelector('#comment');

    if (comment.value === '') return false;
    try {
      addPost(uidUserLogged, nameUserLogged, emailUserLogged, imageUserLogged, comment.value);
      comment.value = '';
    } catch (error) {
      console.warn('Home.js - publishBtn - click - Error: ', error);
      const statusWall = homeContainer.querySelector('#statusWall');
      statusWall.innerText = 'Tuvimos un problema. Intente más tarde';
    }
  });

  const modifyBtn = homeContainer.querySelector('#modifyBtn');
  modifyBtn.addEventListener('click', () => {
    const comment = homeContainer.querySelector('#comment');
    try {
      const status = editPost(idPostEdited, comment.value);
      if (status) {
        idPostEdited = '';
        comment.value = '';
        modifyBtn.classList.add('hidden');
        publishBtn.classList.remove('hidden');
      } else {
        const statusWall = homeContainer.querySelector('#statusWall');
        statusWall.innerText = 'Tuvimos un problema al tratar de editar el post. Intente más tarde';
      }
    } catch (error) {
      console.warn('Home.js - modifyBtn - click - Error: ', error);
      const statusWall = homeContainer.querySelector('#statusWall');
      statusWall.innerText = 'Tuvimos un problema al editar el post. Intente más tarde';
    }
  });

  const containerPost = templatePost.content;
  const fragment = document.createDocumentFragment();
  const postSection = homeContainer.querySelector('#wall');
  postSection.className = 'wall';

  getPost((postData) => {
    postSection.textContent = '';

    postData.forEach((post) => {
      const {
        comment, name, likes, userId, createAt, modified, userPhoto,
      } = post.data();

      containerPost.querySelector('.post-user-name').innerHTML = String(name).toUpperCase() || 'Anónimo';
      containerPost.querySelector('.post-comment').innerHTML = comment;
      containerPost.querySelector('.post-date').innerHTML = calculateDifference(createAt, modified);
      containerPost
        .querySelector('.post-image')
        .setAttribute('src', userPhoto || '/images/profile-default.jpeg');

      containerPost.querySelector('.like-count').innerHTML = `${likes.length || ''}`;
      containerPost.querySelector('.like-count').setAttribute('id', `like-${post.id}`);
      containerPost.querySelector('.heart').setAttribute('id', `likeCount-${post.id}`);
      containerPost.querySelector('.edit').setAttribute('id', `edit-${post.id}`);
      containerPost.querySelector('.trash').setAttribute('id', `trash-${post.id}`);

      const clone = containerPost.cloneNode(true);

      // Busca si usuario loggeado le dio like al post
      const findLike = likes.find((like) => like === emailUserLogged);
      // Agrega icono de like a los post que el usuario le ha dado like
      if (findLike) {
        const likeIcon = clone.querySelector(`#likeCount-${post.id}`);
        const isLike = clone.querySelector('.heart').getAttribute('rel');

        if (isLike === 'like') {
          likeIcon.classList.add('heartAnimation');
          likeIcon.setAttribute('rel', 'unlike');
        }
      }

      // Agrega evento para dar like a un post
      const likeBtn = clone.querySelector('.heart');
      likeBtn.addEventListener('click', () => {
        const likeIcon = homeContainer.querySelector(`#likeCount-${post.id}`);
        const isLike = likeBtn.getAttribute('rel');

        if (isLike === 'like') {
          likeIcon.classList.add('heartAnimation');
          likeIcon.setAttribute('rel', 'unlike');
          likePost(post.id, emailUserLogged);
        }

        if (isLike === 'unlike') {
          likeIcon.classList.add('heartAnimation');
          likeIcon.setAttribute('rel', 'like');
          unlikePost(post.id, emailUserLogged);
        }
      });

      // Verifica si usuario logeado es el mismo que creo este post
      // y activa opciones de eliminar y editar
      if (uidUserLogged === userId) {
        // Agrega evento para dar eliminar un post
        const btnTrash = clone.querySelector('.trash');
        btnTrash.addEventListener('click', () => {
          deletePost(post.id);
        });

        // // AQUI VA EL EVENTO PARA EL ICONO MODIFICAR
        const btnEdit = clone.querySelector('.edit');
        btnEdit.addEventListener('click', () => {
          const textAreaComment = homeContainer.querySelector('#comment');
          const current = homeContainer.querySelector('#current');
          current.textContent = comment.length;

          modifyBtn.classList.remove('hidden');
          publishBtn.classList.add('hidden');

          textAreaComment.value = comment;
          idPostEdited = post.id;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          console.log('editPost', post.id);
        });
      } else {
        clone.querySelector('.post-options').textContent = '';
      }
      fragment.appendChild(clone);
    });

    postSection.appendChild(fragment);
  });

  return homeContainer;
}

export default Home;
