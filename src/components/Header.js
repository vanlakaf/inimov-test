import { connect } from "react-redux";
import NavigationLink from "./NavigationLink";

const Header = connect(
  (state) => ({
    currentUser: state.currentUser,
  }),
  (dispatch) => ({
    logout: () => {
      return dispatch({
        type: "LOGOUT",
      });
    },
  })
)(({ currentUser, logout }) => {
  const render = () => {
    return (
      <>
        <div id="header-app">
          <NavigationLink href="/">
            <span id="logo-text">LifeOpedia!</span>
          </NavigationLink>
          <span id="menu">
            <NavigationLink href="/">HOME</NavigationLink>
            <NavigationLink href="/">AWS</NavigationLink>
            <NavigationLink href="/">TRAVEL</NavigationLink>
            <NavigationLink href="/">DESIGN</NavigationLink>
            <NavigationLink href="/">STYLE</NavigationLink>
            <NavigationLink href="/">FOOD</NavigationLink>
          </span>
          <span id="user-actions">
            {currentUser !== null ? (
              <>
                <NavigationLink href="/post-article">
                  <span className="add-article"></span>
                </NavigationLink>
                <NavigationLink href="/login" onClickEvent={logout}>
                  <span className="logout"></span>
                </NavigationLink>
              </>
            ) : (
              <>
                <NavigationLink href="/login">LOGIN</NavigationLink> |{" "}
                <NavigationLink href="/login">REGISTER</NavigationLink>
              </>
            )}
            <span className="search"></span>
          </span>
        </div>
      </>
    );
  };

  return render();
});

export default Header;
