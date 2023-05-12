/**
 * En este archivo tiene todas las funciones que conectarán el DOM con Firestore.
 */

import {
  onSnapshot,
  collection,
  query,
  addDoc,
  orderBy,
  serverTimestamp,
  where,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './index.js';

// Add a new document in collection "post"
export const addPost = async (userId, name, email, userPhoto, comment) => {
  try {
    const data = await addDoc(collection(db, 'posts'), {
      userId,
      name,
      email,
      comment,
      likes: [],
      userPhoto,
      createAt: serverTimestamp(),
      modified: false,
      modifiedAt: serverTimestamp(),
      deleted: false,
      deletedAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', data.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// get all post in collection "post"
export const getPost = (callback) => {
  try {
    const querySnapshot = query(
      collection(db, 'posts'),
      where('deleted', '==', false),
      orderBy('createAt', 'desc'),
    );
    return onSnapshot(querySnapshot, callback);
  } catch (error) {
    console.warn('Error reading data: ', error);
    return null;
  }
};

export const likePost = async (id, email) => {
  const postRef = doc(db, 'posts', id);

  await updateDoc(postRef, { likes: arrayUnion(email) });
};

export const unlikePost = async (id, email) => {
  const postRef = doc(db, 'posts', id);

  await updateDoc(postRef, { likes: arrayRemove(email) });
};

export const deletePost = (id) => {
  const postRef = doc(db, 'posts', id);

  updateDoc(postRef, { deleted: true, deletedAt: serverTimestamp() });
};

export const editPost = async (id, comment) => {
  const postRef = doc(db, 'posts', id);

  try {
    await updateDoc(postRef, {
      comment,
      modified: true,
      modifiedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    return false;
  }
};
