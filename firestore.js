import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export const getPostDB = async (id) => {
  try {
    const postDoc = await getDoc(doc(db, "posts", id));
    return { id: postDoc.id, data: postDoc.data() };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPostsDB = async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    return snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addPostDB = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      name: post.name,
      imageUri: post.imageUri,
      comments: [],
      likesAmount: 0,
      coords: post.coords,
      postLocation: post.postLocation,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const addCommentDB = async (payload) => {
  try {
    const ref = doc(db, "posts", payload.id);
    const postDoc = await getDoc(ref);

    await updateDoc(ref, {
      comments: postDoc.data().comments.concat(payload.comment),
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};
