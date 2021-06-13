import users from "../fake_data/users.json";
import articles from "../fake_data/articles.json";

export function getUserByUsername(username) {
  return users.data.filter((user) => user.username === username)[0];
}

export function getAvailablesArticles() {
  return articles.data;
}

export function getArticleById(id) {
  return articles.data.filter((a) => a.id === id)[0];
}
