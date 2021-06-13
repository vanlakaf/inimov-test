import { getAvailablesArticles } from "../services/functions";
import { getCurrentUser } from "../tools/features/user.feature";

const initialData = {
    currentUser: getCurrentUser(),
    availableArticles: getAvailablesArticles()
};

export default initialData;