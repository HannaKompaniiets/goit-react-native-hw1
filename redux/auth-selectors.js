const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getCurrentUser = (state) => state.auth.user;
const getIsAuthError = (state) => state.auth.isAuthError;

const authSelectors = {
  getIsLoggedIn,
  getCurrentUser,
  getIsAuthError,
};

export default authSelectors;
