// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFLk6YTAgQLOVIZUlJ1mNeflvbkZtJz88",
  authDomain: "civil-density-394420.firebaseapp.com",
  databaseURL:
    "https://civil-density-394420-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "civil-density-394420",
  storageBucket: "civil-density-394420.appspot.com",
  messagingSenderId: "315371794682",
  appId: "1:315371794682:web:aefc670417a211e1461943",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
