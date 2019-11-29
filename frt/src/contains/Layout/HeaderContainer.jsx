import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNew from 'components/Shop/HeaderNew';

import { actDeleteCart, actDeleteHeaderCart } from  'store/actions/shop';
import { logOut } from "store/actions/user";

class HeaderCartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cart: this.props.cart
        }
    }

    showTotalAmount = (cart) => {
        let total = 0;
        for (let item of cart) {
            total += (item.product.newPrice * item.quantity);
        }
        return total;
    }

    render() {
        let { cart, user, actDeleteHeaderCart } = this.props;
        return (
            <HeaderNew
                {...this.props}
                user={user}
                cart={cart}
                handleDeleteCart={actDeleteHeaderCart}
                showTotalAmount={this.showTotalAmount}
            />
        );
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

export default connect(mapState, {actDeleteHeaderCart, logOut})(HeaderCartContainer);
