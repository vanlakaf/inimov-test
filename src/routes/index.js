// Importations de pages de l'application
import Login from "../pages/Login";
import Home from "../pages/Home";
import PostArticle from "../pages/PostArticle";
import ArticleDetails from "../pages/ArticleDetails";
import { userIsAuth } from "../tools/features/user.feature";

const routes = [
    {
        // path contient le chemin permettant d'atteindre cette route.
        path: "/",
        // name parmet de nommer la route. Ce qui peut être utile pour
        // traitements en rapport avec la route courante
        name: "home",
        // page rensigne la page qui devra être ouverte lorsque l'utilisateur 
        // se rendra à l'url correspondant à path.
        page: Home,
        // canAccess est un callback qui permet de verifier si l'utilisateur
        // est auroisé à acceder à cette route.
        // Si oui, on monte la page en question.
        canAccess: () => userIsAuth(),
        // Si l'utilisateur n'est pas autorisé à acceder à cette route
        // on le redirige vers le path renseignée dans redirectPathTarget...
        redirectPathTarget: "/login"
    },
    {
        path: "/login",
        name: "login",
        page: Login,
        canAccess: () => !userIsAuth(),
        redirectPathTarget: "/"
    },
    {
        path: "/post-article",
        name: "post_article",
        page: PostArticle,
        canAccess: () => userIsAuth(),
        redirectPathTarget: "/login"
    },
    {
        path: "/article/{id}",
        name: "article_details",
        page: ArticleDetails,
        canAccess: () => userIsAuth(),
        redirectPathTarget: "/login"
    },
    {
        path: "/*",
        redirectPathTarget: "/"
    }
]

export default routes;