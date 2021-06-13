import { useState } from "react";

function removeOriginInHref(href) {
  return href.replace(new URL(href).origin, "");
}

const Navigation = ({ routes }) => {
  var [currentPath, setCurrentPath] = useState(
    removeOriginInHref(window.location.href)
  );

  // Si le tableau de configuration des routes n'est pas valide, alors
  // les routes de l'application ne sont pas montées...
  if (typeof routes !== "object" || !routes.length) {
    return <>Incorrect routes configuration object !!!</>;
  }

  // On vérifie dans cette methode s'il existe une route correspondant
  // à celle du navigateur (utile pour les routes dynamiques)...
  const matchWithRouteObject = (href) => {
    const locals = [...routes];
    if (href === "/") {
      return locals.filter((r) => r.path === "/");
    }

    const indexedRoutes = locals.filter(
      (r) => r.path !== "/*" && r.path !== "/"
    );

    const matchRoute = indexedRoutes.filter((r) => {
      let buildRegex = RegExp(
        "^" + r.path.split(/\{\w[\w|\d]*\}/).join("(\\d|\\w)+") + "$"
      );
      return buildRegex.test(href);
    });
    return matchRoute;
  };

  const loadRoute = () => {
    // On recupère dans la configuration des routes celle correspondant
    // au chemin présent dans le navigateur...
    let routeObject = matchWithRouteObject(currentPath)[0];

    // Si on n'a pas eu resultat, alors on redirige vers la route prévue
    // dans l'objet ayant le path à "/*"...
    if (!routeObject) {
      const notFoundRoute = routes.filter((r) => r.path === "/*")[0];

      window.history.pushState({}, "", notFoundRoute.redirectPathTarget);

      routeObject = routes.filter(
        (r) => r.path === notFoundRoute.redirectPathTarget
      )[0];
      setCurrentPath(routeObject.path);
    }

    // Si on n'a eu des resultats mais la route est reservée, alors on
    // redirige vers la route prévue à cette effet...
    if (!routeObject.canAccess()) {
      window.history.pushState({}, "", routeObject.redirectPathTarget);
      routeObject = routes.filter(
        (r) => r.path === routeObject.redirectPathTarget
      )[0];
      setCurrentPath(routeObject.path);
    }

    // Si tout est OK, alors on charge la page correspondante...
    routeObject = { ...routeObject, path: currentPath };
    return routeObject;
  };

  const extractSearchParamsFromHref = () => {
    let searchString = currentPath.split("?");

    if (searchString.length === 1) {
      return {};
    }

    let searchParams = {};
    searchString[1].split("&").forEach((s) => {
      let splitS = s.split("=");
      searchParams[splitS[0]] = !splitS[1] ? true : splitS[1];
    });

    return searchParams;
  };

  const extractParamsFromHref = (route) => {
    const matchRoute = routes.filter((r) => r.name === route.name)[0].path;
    const current = route.path;
    const isDynamic = matchRoute.match(/\{\w[\w|\d]*\}/g);

    if (isDynamic === null) {
      return {};
    }
    const keys = isDynamic.map((item) => item.substring(1, item.length - 1));
    
    if (keys.length === 0) {
        return {};
    }

    const params = {};
    const values = current.match(
      RegExp("^" + matchRoute.split(/\{\w[\w|\d]*\}/).join("(.*)") + "$")
    );
    
    keys.forEach((key, i) => {
        params[key] = values[i + 1];
    });

    return params;
  };

  // Une fois que le changement du path est détecté, la route courante
  // est mise à jour par la methode updateCurrentPageState et le rendu
  // de l'application est déclanché...
  const updateCurrentPageState = (newPath = undefined) => {
    if (!newPath) {
      setCurrentPath(window.location.pathname);
    } else {
      
      // En cas de rediretion, on met à jour currentPath sans passer par
      // setCurrentState (afin d'éviter une quelconque mise à jour du
      // rendu visuel), puis on met à jour l'url du browser et on rend la
      // page correspondant à currentPage...
      currentPath = newPath;
      window.history.pushState({}, "", newPath);
      return renderPage();
    }
  };

  const handlePopstateEvent = () => updateCurrentPageState();

  // Cette methode est appelée pour afficher la page demandée...
  const renderPage = () => {
    let r = loadRoute();
    let Page = r.page;
    let navigationData = {
      name: r.name,
      path: currentPath,
      href: window.location.href,
      params: extractParamsFromHref(r),
      searchParams: extractSearchParamsFromHref(),
    };
    
    return (
      <>
        <Page route={navigationData} redirectToPath={updateCurrentPageState} />
      </>
    );
  };

  // Ici, on réagit au changement de l'url
  window.addEventListener("popstate", handlePopstateEvent);

  return renderPage();
};

export default Navigation;
