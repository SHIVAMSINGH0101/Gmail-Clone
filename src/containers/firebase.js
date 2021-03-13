import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg8G4coSyavgxtZtfGVYCGzFeoCBoZrVs",
  authDomain: "clone-475c8.firebaseapp.com",
  projectId: "clone-475c8",
  storageBucket: "clone-475c8.appspot.com",
  messagingSenderId: "735342576788",
  appId: "1:735342576788:web:cdc47ebbd43d42e18e2081",
  measurementId: "G-NCHG43QQ7X",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
