import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNew from 'components/Shop/HeaderNew';

import { actDeleteCart } from  'store/actions/shop';
import {logOut} from "store/actions/user";

const CartItem = ({item, handleDeleteCart}) => {
    return (
        <div className="cart__item d-flex align-items-center">
            <img src={item.product.src1} alt={item.product.name} />
            <div className="cart__info">
                <h6>{item.product.name}</h6>
                <div>{item.quantity} x <span className="amount">{`$ ${item.product.newPrice}.00`}</span></div>
            </div>
            <button onClick={() => handleDeleteCart(item.product.id)} className="remove btn__shopnow">×</button>
        </div>
    );
}

class HeaderCartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cart: []
        }
    }

    showHeaderCartItem = (cart) => {
        let result = null;

        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return <CartItem key={index} item={item}
                    handleDeleteCart={this.props.handleDeleteCart}
                />
            });
        }

        return result;
    }

    showTotalAmount = (cart) => {
        let total = 0;
        for (let item of cart) {
            total += (item.product.newPrice * item.quantity);
        }
        return total;
    }

    render() {
        let { cart, user } = this.props;
        return (
            <HeaderNew
                {...this.props}
                user={user}
                cart={cart}
                showHeaderCartItem={this.showHeaderCartItem(cart)}
                showTotalAmount={this.showTotalAmount}
            />
        );
    }
}

const mapStateToProp = state => {
    return {
        cart: state.cart
    }
}

function mapState({...user}) {
    return {
        cart: user.cart,
        user: user.user.data
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleDeleteCart: id => {
            dispatch(actDeleteCart(id));
        }
    }
}

export default connect(mapState, {mapDispatchToProps, logOut})(HeaderCartContainer);
