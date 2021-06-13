import { getUserByUsername, getArticleById } from "../../../services/functions";
import {
  clearUserDataFromStorage,
  getCurrentUser,
} from "../../../tools/features/user.feature";

export function loginReducer(state, username) {
  let loggedUser = getUserAndConnect(username);
  if (!loggedUser) {
    return state;
  }
  state.currentUser = loggedUser;
  return state;
}

export function logoutReducer(state) {
  clearUserDataFromStorage();
  state.currentUser = getCurrentUser();
  return state;
}

// Utils

const getUserAndConnect = (username) => {
  const user = getUserByUsername(username);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
  }
  return user;
};
