import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGnIjXshDdx5riOaXPbirWIzT8K3vr7SY",
  authDomain: "defuture-farmer.firebaseapp.com",
  projectId: "defuture-farmer",
  storageBucket: "defuture-farmer.appspot.com",
  messagingSenderId: "1078727175214",
  appId: "1:1078727175214:web:139f44c37c2e87cacac3bf",
  measurementId: "G-L8BLY8HXKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}