import { createStore } from "redux";
import rootReducer from "./reducers";
import initialData from "./initialData";

export default function configureStore() {
    return createStore(rootReducer, initialData);
}