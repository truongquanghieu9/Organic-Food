import {ADD_ERROR} from "../actionTypes";

const DEFAULT_STATE = {
    message: null
}

export default (state = DEFAULT_STATE, {type, msg}) => {
    switch(type){
        case ADD_ERROR:
            return msg ? {...state, message: msg} : DEFAULT_STATE;
        default:
            return state;
    }
}
