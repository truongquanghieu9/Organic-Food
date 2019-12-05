import * as types from '../actionTypes';

export const actDeleteHeaderCart = (id) => {
    return dispatch => (
        dispatch(actDeleteCart(id))
    )
}

export function actCheckout(){
    localStorage.removeItem("cart");
}

// export const actDeleteAllCart = () => {
//     return {
//         type: types.DELETE_ALL_CART,
//     }
// }

export const actAddToCart = (product, quantity) => {
    return {
        type: types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actDeleteCart = (id) => {
    return {
        type: types.DELETE_CART,
        id
    }
}

export const actUpdateCart = (id, quantity) => {
    return {
        type: types.UPDATE_CART,
        id,
        quantity
    }
}

export const actMessage = message => {
    return {
        type: types.CHANGE_MESSAGE,
        message
    }
}
