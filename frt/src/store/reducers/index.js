import {combineReducers} from "redux";
import error from "./error";
import user from "./user";

import products from './products';
import cart from './cart';

const rootReducer = combineReducers({error, user, products, cart});

export default rootReducer;
