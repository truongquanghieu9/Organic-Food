import * as types from '../actionTypes';

let initialState = [];

const products = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        default: return [...state];
    }
};

export default products;
