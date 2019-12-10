import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cart from 'components/Shop/Cart';

import {actDeleteCart, actUpdateCart} from 'store/actions/shop';


class CartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            fee: 0
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showTotalAmount = cart => {
        let total = 0;
        for (let item of cart) {
            total += (item.product.discount * item.quantity);
        }
        return total;
    }

    render() {

        let { cart, products, handleDeleteCart, handleUpdateCart, user } = this.props;
        let { quantity, fee } = this.state;
        return (
            <Cart
                user={user}
                cart={cart}
                fee={fee}
                products={products}
                quantity={quantity}
                handleChange={this.handleChange}
                handleDeleteCart={handleDeleteCart}
                handleUpdateCart={handleUpdateCart}
                showTotalAmount={this.showTotalAmount}
            />
        );
    }
}

const mapStateToProps = ({...user}) => {
    return {
        cart: user.cart,
        products: user.products,
        user: user.user.data
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleDeleteCart: id => {
            dispatch(actDeleteCart(id));
        },
        handleUpdateCart: (id, quantity) => {
            dispatch(actUpdateCart(id, quantity));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
