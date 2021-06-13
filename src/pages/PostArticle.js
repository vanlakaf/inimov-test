import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { images } from "../tools/features/file.feature";

const PostArticle = connect((state) => ({}))(({ route, redirectToPath }) => {
  const [currentImage, setCurrentImage] = useState({
    image: images("./white.png"),
    isNew: false,
  });
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    submitted: false
  });

  const categryList = [
    "category_1",
    "category_2",
    "category_3",
    "category_4",
    "category_5",
    "category_6",
    "category_7",
    "category_8",
    "category_9",
    "category_10",
  ];

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.type.split("/")[0] !== "image") {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCurrentImage({ image: event.target.result, isNew: true });
    };
  };

  const handleCahnge = (e) => {
    if (e.target.id === "title") {
      setNewArticle({ ...newArticle, title: "new-title" });
    }
    if (e.target.id === "content") {
      setNewArticle({ ...newArticle, content: "new-content" });
    }
    if (e.target.id === "category") {
      setNewArticle({ ...newArticle, category: "new-category" });
    }
  };

  const uploadImage = () => {
    if (currentImage.isNew) {
      const imgUrl = "new-image.png";
      return Promise.resolve(imgUrl);
    } else {
      return Promise.resolve(undefined);
    }
  };

  const handleSubmmit = async () => {
    // On envoie l'image sur le serveur, qui, une fois terminé
    // la reception repond avec une url de l'image envoyée.
    // On stocke cette url dans l'attribut image de l'objet newArticle...
    const image = await uploadImage();

    if (image) {
      // On verifie que l'objet newArticle est valide
      let checkData = true;
      const article = { ...newArticle, image };
      delete article.submitted;

      for (let key in article) {
        if (article.hasOwnProperty(key)) {
          checkData = checkData && article[key].length > 0;
        }
      }

      if (checkData) {
        // On soumet les données et une fois que c'est ok,
        // on redirige vers la page de details de l'article
        // ajouté basée sur l'id de l'article publié qui a
        // été généré par le serveur.
        setNewArticle({ ...article, submitted: true });
      } else {
        console.log("Incorrect object !!");
      }
    } else {
      console.log("Can not upload image !!");
    }
  };

  const render = () => {
    if (newArticle.submitted) {
      return redirectToPath("/article/4");
    }
    return (
      <>
        <div id="post-article">
          <div>
            <span id="story">
              <input
                type="text"
                placeholder="Title"
                id="title"
                onChange={handleCahnge}
              />
              <br />
              <span id="smooth-form">
                <span className="label">Text</span>
                <textarea
                  placeholder="Tell your story"
                  id="content"
                  onChange={handleCahnge}
                ></textarea>
              </span>
              <span id="featured">
                <span id="image-featured">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    id="image-file"
                    onChange={handleChangeFile}
                  />
                  <img src={currentImage.image} alt="your featured" />
                  <label className="caption" htmlFor="image-file">
                    Add featured image
                  </label>
                </span>
                <span id="category-featured">
                  <label className="caption"></label>
                  <select
                    onChange={handleCahnge}
                    id="category"
                    value={
                      newArticle.category.length > 0
                        ? newArticle.category
                        : "__"
                    }
                  >
                    <option disabled={true} value="__">
                      Select Category
                    </option>
                    {categryList.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </span>
                <span id="tag-featured">
                  <label className="caption"></label>
                  <input type="text" placeholder="Acticle Tags" />
                </span>
                <span>Separate tags with a comma</span>
              </span>
            </span>
            <span id="actions">
              <button>Save</button>
              <button onClick={handleSubmmit}>Publish</button>
            </span>
          </div>
        </div>
      </>
    );
  };

  return render();
});

export default PostArticle;
