// import { boot } from 'quasar/wrappers'

// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBCvWY_2pPyNvAAiIi0znTf_xRDuGrriaQ",
  authDomain: "ehsan-echat.firebaseapp.com",
  projectId: "ehsan-echat",
  storageBucket: "ehsan-echat.appspot.com",
  messagingSenderId: "426039791308",
  appId: "1:426039791308:web:27a5e59e002803a083bc69",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default db;
