import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDXG-tjQ9xGaqZJiDEIfby3jgq40P-rm8Y",
  authDomain: "skrate-login.firebaseapp.com",
  projectId: "skrate-login",
  storageBucket: "skrate-login.appspot.com",
  messagingSenderId: "282815877821",
  appId: "1:282815877821:web:ca679924c6dec437cfddd4",
};
const login = initializeApp(firebaseConfig);

export const authentication = getAuth(login);
