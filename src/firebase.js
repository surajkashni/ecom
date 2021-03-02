import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmgX2CA8BbtedAxtXJFcjSRfo9Xi2BGNk",
  authDomain: "ecom-a0c76.firebaseapp.com",
  projectId: "ecom-a0c76",
  storageBucket: "ecom-a0c76.appspot.com",
  messagingSenderId: "131176397359",
  appId: "1:131176397359:web:a5bffb718c842c99be64da"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
