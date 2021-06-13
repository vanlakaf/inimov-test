import { connect } from "react-redux";
import NavigationLink from "./NavigationLink";

const Footer = connect((state) => ({}))(() => {
  const render = () => {
    return (
      <>
        <div id="footer-app">
          <NavigationLink href="/">
            <span id="logo-text">LifeOpedia!</span>
          </NavigationLink>
          <span id="terms-and-conditions">
            Privacy Policy Terms & Conditions
            <br />
            <span className="copyright">
              Copyright 2020 All rights reserved
            </span>
          </span>
          <span id="social-network">
              Connect with us 
              <span className="social-network-link facebook"></span>
              <span className="social-network-link twitter"></span>
              <span className="social-network-link insta"></span>
          </span>
        </div>
      </>
    );
  };
  return render();
});

export default Footer;
