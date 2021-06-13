import React from "react";
import { connect } from "react-redux";
import { images } from "../tools/features/file.feature";

const ArticleDetails = connect(
  (state) => ({ articles: state.availableArticles })
)(({ route, articles }) => {
  const render = () => {
    let article = articles.filter(item => item.id === route.params.id)[0];

    return (
      <>
        <div id="article-details">
          <span id="category">{article.category}</span>
          <span id="title">{article.title}</span>
          <img src={images("./" + article.image)} alt="article" />
          <span id="content">{article.content}</span>
        </div>
      </>
    );
  };
  return render();
});

export default ArticleDetails;
