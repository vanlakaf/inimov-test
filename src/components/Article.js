import { connect } from "react-redux";
import NavigationLink from "./NavigationLink";
import { images } from "../tools/features/file.feature";

const Article = connect((state) => ({}))(({ data }) => {
  const render = () => {
    return (
      <>
        <span className="article">
          <NavigationLink href={"/article/" + data.id}>
            <span
              className="image"
              style={{ backgroundImage: `url(${images("./" + data.image)})` }}
            >
                <span className="article-title">{data.title}</span>
            </span>
          </NavigationLink>
          <span className="story">{data.content}</span>
          <br />
        </span>
      </>
    );
  };

  return render();
});

export default Article;
