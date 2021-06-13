export const userIsAuth = () => "user" in localStorage && "token" in localStorage;

export const getCurrentUser = () =>
  userIsAuth() ? JSON.parse(localStorage.getItem("user")) : null;

export const clearUserDataFromStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
