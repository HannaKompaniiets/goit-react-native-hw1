import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "./config";

export const registerDB = async ({ email, password }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return { user: credentials.user, token: credentials.refreshToken };
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const logOutDB = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
