import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const fb_init = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
});

export const fb = firebase;

export const fb_db = firebase.firestore();

export const fb_auth = firebase.auth();

export const fb_storage = firebase.storage();
