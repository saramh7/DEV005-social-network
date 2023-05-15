/**
 * @jest-environment jsdom
 */
import Home from '../../src/components/Home.js';
import { getUserSession, googleLogout } from '../../src/lib/auth.js';
import {
  getPost, addPost, likePost, unlikePost, deletePost, editPost,
} from '../../src/lib/firestore.js';

// Mockear las funciones o módulos externos que se utilizan en Home.js
jest.mock('../../src/lib/auth.js', () => ({
  getUserSession: jest.fn((callback) => {
    const user = {
      uid: 'test-user-id',
      email: 'test@test.com',
      displayName: 'mockName',
      photoURL: '/image/mockImage.png',
    };
    callback(user);
  }),
  googleLogout: jest.fn(),
}));

jest.mock('../../src/lib/firestore.js', () => ({
  getPost: jest.fn().mockImplementation((callback) => Promise.resolve(callback([
    {
      data: jest.fn().mockReturnValue({
        comment: 'Test comment',
        name: 'Test name',
        email: 'test@example.com',
        likes: ['test@test.com'],
        userId: 'test-user-id',
        createAt: {
          toDate: jest.fn().mockReturnValue(new Date()),
          toLocaleTimeString: jest.fn().mockReturnValue('10:30 AM'),
        },
        modified: false,
        userPhoto: '/images/profile-default.jpeg',
      }),
      id: 'test-post-id',
    },
  ]))),
  addPost: jest.fn(),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
  deletePost: jest.fn(),
  editPost: jest.fn(() => true),
}));

describe('Home', () => {
  let navigateToMock;

  beforeEach(() => {
    // Resetea los mocks antes de cada prueba
    jest.clearAllMocks();
    // Crea una función mock para navigateTo
    navigateToMock = jest.fn();
  });

  test('debe llamar a getUserSession al inicializar', () => {
    // Act
    Home(navigateToMock);

    // Assert
    expect(getUserSession).toHaveBeenCalledTimes(1);
    expect(getUserSession).toHaveBeenCalledWith(expect.any(Function));
  });

  test('debe llamar a googleLogout y navegar al hacer clic en logoutBtn', () => {
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Act
    const logoutBtn = DOM.querySelector('#logoutBtn');
    logoutBtn.click();

    // Assert
    expect(googleLogout).toHaveBeenCalledTimes(1);
    expect(navigateToMock).toHaveBeenCalledTimes(1);
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });

  test('debe agregar un post y llamar a addPost al hacer clic en publishBtn', () => {
    // Arrange
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    const publishBtn = DOM.querySelector('#publishBtn');
    const commentInput = DOM.querySelector('#comment');
    commentInput.value = 'Test post';

    // Act
    publishBtn.click();

    // Assert
    expect(addPost).toHaveBeenCalledTimes(1);
    expect(addPost).toHaveBeenCalledWith(
      'test-user-id',
      'mockName',
      'test@test.com',
      '/image/mockImage.png',
      'Test post',
    );
    expect(commentInput.value).toBe('');
  });

  test('debe editar un post y llamar a editPost al hacer clic en modifyBtn', () => {
    // Arrange
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));
    const modifyBtn = DOM.querySelector('#modifyBtn');
    const publishBtn = DOM.querySelector('#publishBtn');
    const commentInput = DOM.querySelector('#comment');
    commentInput.value = 'Modified post';

    // Act
    modifyBtn.click();

    // Assert
    expect(editPost).toHaveBeenCalledTimes(1);
    expect(editPost).toHaveBeenCalledWith(undefined, 'Modified post');
    expect(commentInput.value).toBe('');
    expect(modifyBtn.classList.contains('hidden')).toBe(true);
    expect(publishBtn.classList.contains('hidden')).toBe(false);
  });

  test('debe mostrar un mensaje de error al editar un post si editPost retorna false', () => {
    // Arrange
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));
    const modifyBtn = DOM.querySelector('#modifyBtn');
    const commentInput = DOM.querySelector('#comment');
    const statusWall = DOM.querySelector('#statusWall');
    commentInput.value = 'Modified post';

    editPost.mockImplementation(() => false);

    // Act
    modifyBtn.click();

    // Assert
    expect(editPost).toHaveBeenCalledTimes(1);
    expect(editPost).toHaveBeenCalledWith(expect.any(String), 'Modified post');
    setTimeout(() => {
      expect(commentInput.value).toBe('');
      expect(statusWall.innerText).toBe('Error al editar el post');
    }, 0);
  });

  test('Debe mostrar un post correctamente', () => {
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Simular evento DOMContentLoaded
    window.dispatchEvent(new Event('DOMContentLoaded'));

    expect(getPost).toHaveBeenCalledTimes(6);

    // Verificar que los elementos del post se hayan renderizado correctamente
    expect(DOM.querySelector('.post-user-name').textContent).toBe('TEST NAME');
    expect(DOM.querySelector('.post-date').textContent).toBe('Hace unos instantes ');
    expect(DOM.querySelector('.post-comment').textContent).toBe('Test comment');
    expect(DOM.querySelector('.post-image').getAttribute('src')).toBe('/images/profile-default.jpeg');
    expect(DOM.querySelector('.like-count').textContent).toBe('1');
  });

  test('debe actualizar textarea, mostrar edit button y ocultar publish button al editar post', () => {
    // Llamar a la función Home
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Simular evento DOMContentLoaded
    window.dispatchEvent(new Event('DOMContentLoaded'));

    const textareaComment = DOM.querySelector('#comment');
    const modifyBtn = DOM.querySelector('#modifyBtn');
    const publishBtn = DOM.querySelector('#publishBtn');

    const editButton = DOM.querySelector('.edit');
    editButton.click();

    expect(textareaComment.value).toBe('Test comment');
    expect(modifyBtn.classList.contains('hidden')).toBe(false);
    expect(publishBtn.classList.contains('hidden')).toBe(true);
  });

  test('debe llamar correctamente al método delete al presionar botón eliminar', () => {
    // Llamar a la función Home
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Simular evento DOMContentLoaded
    window.dispatchEvent(new Event('DOMContentLoaded'));

    const deleteButton = DOM.querySelector('.trash');
    deleteButton.click();

    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenCalledWith('test-post-id');
  });

  test('debe llamar correctamente al método like al presionar el corazón desactivado', () => {
    // Llamar a la función Home
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Simular evento DOMContentLoaded
    window.dispatchEvent(new Event('DOMContentLoaded'));

    //
    const likeButton = DOM.querySelector('.heart');
    const likeIcon = DOM.querySelector('#likeCount-test-post-id');
    likeIcon.setAttribute('rel', 'like');
    likeButton.click();

    expect(likePost).toHaveBeenCalledTimes(1);
    expect(likePost).toHaveBeenCalledWith('test-post-id', 'test@test.com');
  });

  test('debe llamar correctamente al método unlike al presionar el corazón activado', () => {
    // Llamar a la función Home
    const DOM = document.createElement('div');
    DOM.append(Home(navigateToMock));

    // Simular evento DOMContentLoaded
    window.dispatchEvent(new Event('DOMContentLoaded'));

    //
    const likeButton = DOM.querySelector('.heart');
    const likeIcon = DOM.querySelector('#likeCount-test-post-id');
    likeIcon.setAttribute('rel', 'unlike');
    likeButton.click();

    expect(unlikePost).toHaveBeenCalledTimes(1);
    expect(unlikePost).toHaveBeenCalledWith('test-post-id', 'test@test.com');
  });
});
