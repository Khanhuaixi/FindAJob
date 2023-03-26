import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBigYUkIg-pS6uRxyLOCN7pGRE6AWfhe_4",
  authDomain: "findajob-40d98.firebaseapp.com",
  projectId: "findajob-40d98",
  storageBucket: "findajob-40d98.appspot.com",
  messagingSenderId: "1036985569796",
  appId: "1:1036985569796:web:d35dd2462ee447260ddb51",
  measurementId: "G-XTF5ELS29B",
};

if (!firebase.apps.length) {
  //if there is firebase connectivity
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// const app = initializeApp(firebaseConfig);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

export { firebase };
