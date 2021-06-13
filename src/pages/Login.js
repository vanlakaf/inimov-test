import React from "react";
import { connect } from "react-redux";

const Login = connect(
    (state) => ({
      currentUser: state.currentUser,
    }),
    (dispatch) => ({
      logIn: (username) => {
        return dispatch({
          type: "LOGIN",
          payload: username,
        });
      },
    })
  )(({ route, redirectToPath, currentUser, logIn }) => {
  var username = "";

  const runLogIn = () => {
    if (!/^\w(\d|\w)*$/.test(username.trim()) || / +/.test(username.trim())) {
      console.log("Icorrect username !!!");
      return;
    }
    logIn(username);
  };

  const handleChange = (e) => {
    username = e.target.value;
  };

  const handleClick = () => {
    if (username.length > 0) {
      runLogIn();
    }
  };

  const handleKeyUp = (e) => {
      if (e.key === "Enter") {
          runLogIn();
      }
  };

  const render = () => {
    if (currentUser !== null) {
      return redirectToPath("/post-article");
    } else {
      return (
        <>
          <div id="login-page">
            <div id="login-form">
              <div className="tabs">
                <span className="activated">LOG IN</span>
                <span>REGISTER</span>
              </div>
              <div className="tab-view">
                <label htmlFor="username">USERNAME</label>
                <br />
                <input
                  type="text"
                  id="username"
                  placeholder="Username..."
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
                <br />
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">KEEP ME LOGGED IN</label>
                <br />
                <button id="login-button" onClick={handleClick}>
                  LOG IN
                </button>
              </div>
            </div>
            <div className="or">
              <span></span>
              <br />
              OR
              <br />
              <span></span>
            </div>
            <div id="third-part-login">
              LOGIN WITH <br />
              <div id="third-part-links">
                <span id="facebook-link" className="media-link">
                  <span></span> FACEBOOK
                </span>
                <span id="in-link" className="media-link">
                  <span></span> LINKEDIN
                </span>
                <span id="twitter-link" className="media-link">
                  <span></span> TWITTER
                </span>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return render();
});

export default Login;
