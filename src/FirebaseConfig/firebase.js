
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Obtener datos 

const firebaseConfig = {
  apiKey: "AIzaSyCzXtwvAHKdUeGqwDhuZkfzbKC4uxfXpOo",
  authDomain: "book-inventary.firebaseapp.com",
  projectId: "book-inventary",
  storageBucket: "book-inventary.firebasestorage.app",
  messagingSenderId: "328024502881",
  appId: "1:328024502881:web:9c79a0930d41e61b877020"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtener dato
export { db };