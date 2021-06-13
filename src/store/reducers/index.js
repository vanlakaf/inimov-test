import * as actions from "../actions";
import { loginReducer, logoutReducer } from "./functions";

function rootReducer(state, action) {
  switch (action.type) {
    case actions.loginAction().type:
      return loginReducer({ ...state }, action.payload);

    case actions.logoutAction().type:
      return logoutReducer({ ...state });

    default:
      return state;
  }
}

export default rootReducer;
