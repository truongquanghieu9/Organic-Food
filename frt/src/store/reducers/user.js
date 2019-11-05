import {ADD_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    data: {}
}

export default (state = DEFAULT_STATE, action) => {
    const {type, user} = action;
    switch(type){
        case ADD_USER:
            return {
                isAuthenticated: !!Object.keys(user).length,
                data: user
            };
        default:
            return state;
    }
}
