import {ADD_ERROR} from "../actionTypes";

export const setError = (msg = false) => ({type: ADD_ERROR, msg});
