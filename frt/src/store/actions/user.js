import {ADD_USER} from "../actionTypes";
import {apiCall, setTokenHeader} from "services/api";
import {setError} from "./error";

export const setUser = user => ({type: ADD_USER, user});

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logOut(){
    return dispatch => {
        localStorage.clear();
        sessionStorage.clear();
        setAuthorizationToken(false);
        dispatch(setUser({}));
    };
}

export function authUser(route, data) {
    return async(dispatch) => {
        try {
            let rs = await apiCall("post", route, data);
            const {token, ...user} = rs;
            localStorage.setItem("token", token);
            // client store data
            setAuthorizationToken(token);
            sessionStorage.setItem("auth", JSON.stringify(user));
            // redux store
            dispatch(setUser(user));
            dispatch(setError());
        } catch(err) {
            dispatch(setError(err));
        }
    }
}

export function activateUser(id) {
    return async(dispatch) => {
        try {
            sessionStorage.clear();
            dispatch(setUser({}));
        } catch(err) {
            dispatch(setError(err));
        }
    }
}
