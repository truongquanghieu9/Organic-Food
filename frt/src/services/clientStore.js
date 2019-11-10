import {setUser} from "../store/actions/user";
import {setTokenHeader, apiCall} from "./apiCall";
import jwtDecode from "jwt-decode";

export async function checkStore(store){
    try {
        if(localStorage.token && sessionStorage.auth){
            setTokenHeader(localStorage.token);
            const user = JSON.parse(sessionStorage.auth);
            store.dispatch(setUser(user));
        } else {
            if(localStorage.token){
                setTokenHeader(localStorage.token);
                let decode = jwtDecode(localStorage.token);
                let savedUser = await apiCall("get", `/api/user/${decode._id}`);
                if(savedUser) {
                    sessionStorage.setItem("auth", JSON.stringify(savedUser));
                    store.dispatch(setUser(savedUser));
                }
            }
        }
    } catch(err) {
        //if the token is tampered, change authenticate to false
        store.dispatch(setUser({}));
        localStorage.clear();
        setTokenHeader(false);
        console.log(err);
    }
}
