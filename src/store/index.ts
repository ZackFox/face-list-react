import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { user } from "./user/reducers";
import { resume } from "./resume/reducers";
// import currentResume from "./currentResume";

const rootReducer = combineReducers({ user, resume });
export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
