import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_mNGniGZHDGT6dRxcI7CVYD_4QnTyFXQ",
  authDomain: "food-waste-management-f70d9.firebaseapp.com",
  projectId: "food-waste-management-f70d9",
  storageBucket: "food-waste-management-f70d9.appspot.com",
  messagingSenderId: "864012484841",
  appId: "1:864012484841:web:6be4655385ad7689f63078",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
