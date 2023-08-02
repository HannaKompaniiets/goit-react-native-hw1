import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPostDB, addCommentDB, getPostDB, getAllPostsDB } from "../firestore";

export const addPost = createAsyncThunk(
  "post/addPost",
  async (payload, thunkAPI) => {
    try {
      await addPostDB(payload);
      getAllPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (payload, thunkAPI) => {
    try {
      await addCommentDB(payload);
      getPost({ id: payload.id });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async ({ id }, thunkAPI) => {
    try {
      const post = await getPostDB(id);
      return post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await getAllPostsDB();
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const operations = {
  addPost,
  addComment,
  getPost,
  getAllPosts,
};

export default operations;
