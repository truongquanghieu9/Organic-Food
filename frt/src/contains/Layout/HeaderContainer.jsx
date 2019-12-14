import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import HeaderNew from 'components/Shop/HeaderNew';

import { actDeleteHeaderCart } from  'store/actions/shop';
import { logOut } from "store/actions/user";

class HeaderCartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showTotalAmount = (cart) => {
        let total = 0;
        for (let item of cart) {
            total += (item.product.discount * item.quantity);
        }
        return total;
    }

    searchProduct = (searchKey) => {
        // <Link to={`/search/${searchKey}`}/>
        console.log(this.props);
        this.props[0].history.push(`/search/${searchKey}`)
        
    }

    render() {
        let { cart, user, actDeleteHeaderCart } = this.props;
        let {searchKey} = this.state;
        return (
            <HeaderNew
                {...this.props}
                user={user}
                cart={cart}
                searchKey={searchKey}
                handleChange={this.handleChange}
                searchProduct={this.searchProduct}
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

export default connect(mapState, {actDeleteHeaderCart, logOut})(HeaderCartContainer);
