const getPosts = (state) => state.post.posts;
const getActivePost = (state) => state.post.activePost;

const postSelectors = {
  getPosts,
  getActivePost,
};

export default postSelectors;
