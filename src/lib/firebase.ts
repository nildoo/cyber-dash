/* eslint-disable */
//@ts-ignore
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: 'cyber-app-e7821',
  storageBucket: 'cyber-app-e7821.appspot.com',
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);