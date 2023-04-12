import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
// import {
//   getFirestore
// } from "firebase/firestore"
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBigYUkIg-pS6uRxyLOCN7pGRE6AWfhe_4",
  authDomain: "findajob-40d98.firebaseapp.com",
  projectId: "findajob-40d98",
  storageBucket: "findajob-40d98.appspot.com",
  messagingSenderId: "1036985569796",
  appId: "1:1036985569796:web:d35dd2462ee447260ddb51",
  measurementId: "G-XTF5ELS29B",
};

// const app = initializeApp(firebaseConfig)

// export const db = getFirestore(app)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
firebase.firestore().settings({ timestampsInSnapshot: true, merge: true });
export { firebase };
