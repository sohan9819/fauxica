// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiDAZakaOJWu2lBRk_kN1CYG_gazWQoEc',
  authDomain: 'fauxica-db.firebaseapp.com',
  projectId: 'fauxica-db',
  storageBucket: 'fauxica-db.appspot.com',
  messagingSenderId: '559434577985',
  appId: '1:559434577985:web:d16e74aa9885ae2c79aec0',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// TODO : This is temp fix , fix this error afterwards
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Auth Provider : GOOGLE
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleAuthProvider);

export const createUserDocFromAuth = async (user: User) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error('Error creating the user', (error as Error).message);
    }
  }

  return userDocRef;
};

type AuthUser = {
  email: string;
  password: string;
};

export const createAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: AuthUser) => await createUserWithEmailAndPassword(auth, email, password);

export const signInAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: AuthUser) => await signInWithEmailAndPassword(auth, email, password);

type AuthStateChangeCallback = (user: User | null) => void;

export const onAuthStateChangedHandler = (
  callback: AuthStateChangeCallback
) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => await signOut(auth);

export const deleteUser = async (user: User) => {
  await deleteDoc(doc(db, 'users', user.uid));
  await user.delete();
};
