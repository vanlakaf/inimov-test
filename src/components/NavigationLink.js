const NavigationLink = ({ href, onClickEvent, children }) => {
  const goTo = (e) => {
    e.preventDefault();
    
    if (typeof href !== "string") {
        throw Error("href must be a string but got " + typeof href);
    }

    if (onClickEvent && onClickEvent instanceof Function) {
      onClickEvent();
    }
    
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <>
      <a className="navigation-link" href={href} onClick={goTo}>
          {children}
      </a>
    </>
  );
};

export default NavigationLink;