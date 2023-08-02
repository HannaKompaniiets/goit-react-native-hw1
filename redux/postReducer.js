import { createSlice } from "@reduxjs/toolkit";
import { addPost, addComment, getPost, getAllPosts } from "./post-operations";

const initialState = {
  posts: [],
  postsLoading: false,
  activePost: null,
  error: null,
};

const postSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [getPost.pending](state) {
      state.postsLoading = true;
    },
    [getPost.fulfilled](state, action) {
      state.activePost = action.payload;
      state.postsLoading = false;
      state.error = null;
    },
    [getPost.rejected](state, action) {
      state.activePost = null;
      state.postsLoading = false;
      state.error = action.payload;
    },

    [getAllPosts.pending](state) {
      state.postsLoading = true;
    },
    [getAllPosts.fulfilled](state, action) {
      state.posts = action.payload;
      state.postsLoading = false;
      state.error = null;
    },
    [getAllPosts.rejected](state, action) {
      state.posts = [];
      state.postsLoading = false;
      state.error = action.payload;
    },

    [addPost.pending](state) {
      state.postsLoading = true;
    },
    [addPost.fulfilled](state) {
      state.postsLoading = false;
      state.error = null;
    },
    [addPost.rejected](state, action) {
      state.postsLoading = false;
      state.error = action.payload;
    },

    [addComment.pending](state) {
      state.postsLoading = true;
    },
    [addComment.fulfilled](state) {
      state.postsLoading = false;
      state.error = null;
    },
    [addComment.rejected](state, action) {
      state.postsLoading = false;
      state.error = action.payload;
    },
  },
});

export const postReducer = postSlice.reducer;
