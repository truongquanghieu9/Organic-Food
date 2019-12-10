import * as types from '../actionTypes';

let data = JSON.parse(localStorage.getItem('cart'));

let initialState = data ? data : [];

let findIndex = (cart, id) => {
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product._id === id) {
            return index = i;
        }
    }
    return index;
}

// const findIndex = (cart, id) => (
//     cart.findIndex(c => c.id === id)
// );

const cart = (state = initialState, action) => {
    let { product, quantity } = action
    let index = -1;
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findIndex(state, product._id);
            if (index !== -1) {
                state[index].quantity += quantity;
            } else {
                state.push({
                    product,
                    quantity
                });
            }
            localStorage.setItem("cart", JSON.stringify(state));
            return [...state];
        case types.DELETE_CART:
            index = findIndex(state, action.id);
            if(index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(state));
            return [...state];
        case types.UPDATE_CART:
            index = findIndex(state, action.id);
            if(index !== -1 && quantity >=1) {
                state[index].quantity = quantity;
            }
            localStorage.setItem("cart", JSON.stringify(state));
            return [...state];
        case types.DELETE_ALL_CART:
            state = [];
            return [...state];
        default: return [...state];
    }
};

export default cart;
