import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const firebaseApp = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
// const db = firebaseApp.firestore();
// const storage = firebase.storage();

var auth = firebase.auth();
export { auth, provider };
