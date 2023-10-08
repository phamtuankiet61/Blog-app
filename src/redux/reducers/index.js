import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    postsReducer,
    modalReducer
})