import firebase from 'firebase/app'
import 'firebase/firestore'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAaSSHYt1pq2kihdTrvffvXwRXFZju0XL4",
    authDomain: "organizexpense.firebaseapp.com",
    databaseURL: "https://organizexpense.firebaseio.com",
    projectId: "organizexpense",
    storageBucket: "organizexpense.appspot.com",
    messagingSenderId: "65883422674",
    appId: "1:65883422674:web:82b3fc25b0d6f3741b120b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase