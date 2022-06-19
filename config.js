import firebase from 'firebase'; 
import '@firebase/firestore'; 
// Required for side-effects 
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCbkWiK3PPdJ1HOJfZ9xo0wEg041rKgLJM",
  authDomain: "petcare-e6259.firebaseapp.com",
  projectId: "petcare-e6259",
  storageBucket: "petcare-e6259.appspot.com",
  messagingSenderId: "986295551334",
  appId: "1:986295551334:web:d9588748efd7ef990eb4a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); } 
//export default firebase.database() 
var db = firebase.firestore(); 
export default db;