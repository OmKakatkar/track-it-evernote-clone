import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCVfWQcUnIofKuTdHRuc8C76RixpSQGSf8",
  authDomain: "track-it-evernote-clone.firebaseapp.com",
  projectId: "track-it-evernote-clone",
  storageBucket: "track-it-evernote-clone.appspot.com",
  messagingSenderId: "937335656619",
  appId: "1:937335656619:web:7cf41391dac0cb3b8da7ee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore()
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
export default firebase;