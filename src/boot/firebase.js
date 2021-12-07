import firebase from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2sDzzMvBSZiD-Lxps7WlZYM8Q8T-Ae9I",
  authDomain: "notesprojectinterview.firebaseapp.com",
  projectId: "notesprojectinterview",
  storageBucket: "notesprojectinterview.appspot.com",
  messagingSenderId: "1064568219879",
  appId: "1:1064568219879:web:ded0c761a4011564459a42"
};

//console.log(initializeApp)
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

let db = firebase.getFirestore(firebase.initializeApp(firebaseConfig));
console.log(db)

export default db;