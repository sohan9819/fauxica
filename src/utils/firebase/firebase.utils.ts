// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
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
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import {
  AuthUser,
  AuthStateChangeCallback,
  ProductsList,
  ProductData,
  InitialOrderState,
  Order,
} from '../types';

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

const auth = getAuth();
const signInWithGooglePopup = () => {
  const authentication = signInWithPopup(auth, googleAuthProvider);
  return authentication;
};

const createUserDocFromAuth = async (user: User) => {
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

const createAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: AuthUser) => await createUserWithEmailAndPassword(auth, email, password);

const signInAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: AuthUser) => await signInWithEmailAndPassword(auth, email, password);

const onAuthStateChangedHandler = (callback: AuthStateChangeCallback) => {
  return onAuthStateChanged(auth, callback);
};

const signOutUser = async () => await signOut(auth);

const deleteUser = async (user: User) => {
  await deleteDoc(doc(db, 'users', user.uid));
  await user.delete();
};

const addOrderToUser = async (
  orderData: InitialOrderState
): Promise<string> => {
  try {
    const ordersCollectionRef = collection(
      db,
      'users',
      auth.currentUser?.uid as string,
      'orders'
    );
    const newOrderDocRef = await addDoc(ordersCollectionRef, orderData);
    const orderId = newOrderDocRef.id;
    return orderId;
  } catch (error) {
    console.error('Error adding order to user', error);
    throw new Error('Failed to add order to user');
  }
};

const getAllOrders = async () => {
  try {
    const ordersCollectionRef = collection(
      db,
      `users/${auth.currentUser?.uid as string}/orders`
    );
    const ordersSnapshot = await getDocs(ordersCollectionRef);

    const orders = ordersSnapshot.docs.map(
      (doc) =>
        ({
          uid: doc.id,
          ...doc.data(),
        } as Order)
    );
    return orders.length !== 0 ? orders : null;
  } catch (error) {
    const e = error as FirebaseError;
    console.error('Error retrieving orders:', e.message);
    // throw new Error('Failed to retrieve orders');
    return null;
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const orderDocRef = doc(
      db,
      `users/${auth.currentUser?.uid as string}/orders`,
      orderId
    );
    const orderDoc = await getDoc(orderDocRef);
    return orderDoc.data() as Order;
  } catch (error) {
    const e = error as FirebaseError;
    console.log('Failed to retrive order', e.message);
    return null;
  }
};

const createProductCollection = async (products: ProductsList) => {
  try {
    const productsCollectionRef = collection(db, 'products');
    // Iterate over the products array and add each product as a document
    for (const product of products) {
      await addDoc(productsCollectionRef, product);
    }
    console.log('Product collection created successfully!');
  } catch (error) {
    const e = error as FirebaseError;
    console.log('Error creating product collection:', e.message);
  }
};

const getProductCollection = async () => {
  try {
    const productsCollectionRef = collection(db, 'products');
    const productsSnapShot = await getDocs(productsCollectionRef);

    return productsSnapShot.docs.reduce((acc: ProductsList, doc) => {
      return [
        ...acc,
        { uuid: doc.id as string, ...(doc.data() as ProductData) },
      ];
    }, []);
  } catch (error) {
    const e = error as FirebaseError;
    console.log('Error retrieving product collection:', e.message);
  }
};

export {
  auth,
  signInWithGooglePopup,
  createUserDocFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  onAuthStateChangedHandler,
  signOutUser,
  createProductCollection,
  getProductCollection,
  deleteUser,
  addOrderToUser,
  getOrderById,
  getAllOrders,
};
