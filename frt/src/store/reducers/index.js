import {combineReducers} from "redux";
import error from "./error";
import user from "./user";

import cart from './cart';

const rootReducer = combineReducers({error, user, cart});

export default rootReducer;
