import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAo_8tSa2I6SemfY2pBNfYMr-sQXOAdDpc",
  authDomain: "tixa-scanner.firebaseapp.com",
  databaseURL: "https://tixa-scanner.firebaseio.com",
  projectId: "tixa-scanner",
  storageBucket: "tixa-scanner.appspot.com",
  messagingSenderId: "498352253355",
  appId: "1:498352253355:web:dcb8a83ccf97abd7778aee",
  measurementId: "G-81BDX8P438"
};

const app = initializeApp(firebaseConfig);
const firebaseFunctions = getFunctions(app);
const firebaseFirestore = getFirestore(app);

export {
    app,
    firebaseFunctions,
    firebaseFirestore
}