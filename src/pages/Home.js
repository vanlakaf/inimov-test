import { connect } from "react-redux";
import Article from "../components/Article";

const Home = connect((state) => ({
  articles: state.availableArticles,
}))(({ articles }) => {
  const organizeArtcilesByCategory = () => {
    let ouput = [];
    articles.forEach((a) => {
      let findCategyIndexInOutput = ouput.findIndex(
        (obj) => obj.category === a.category
      );
      if (findCategyIndexInOutput < 0) {
        let result = {
          category: a.category,
          articles: [],
        };
        result.articles.push(a);
        ouput.push(result);
      } else {
        ouput[findCategyIndexInOutput].articles.push(a);
      }
    });
    return ouput;
  };

  const render = () => {
    let organizedArticles = organizeArtcilesByCategory();

    return (
      <>
        <div id="home">
          {organizedArticles.map((obj, i) => (
            <div className="category-bloc" key={i}>
              <span className="title">
                  <span>{obj.category}</span>
              </span>
              <div className="articles">
                {obj.articles.map((a, j) => (
                  <Article data={a} key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return render();
});

export default Home;
