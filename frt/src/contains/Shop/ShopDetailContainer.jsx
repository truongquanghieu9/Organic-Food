import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import ShopDetail from 'components/Shop/ShopDetail';

import {productList} from "services/testShopData/FakeData"
import { actAddToCart, actMessage, actFetchProductsRequest } from 'store/actions/shop';

class ShopDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isShowMessage: false,
            products: productList
        }
    }

    async componentDidMount() {
        // this.props.handleFetchProductsRequest();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleIncreasehandleDecrease = (one) => {
        this.setState({
            quantity: this.state.quantity + one
        })
    }

    handlAddToCart = product => {
        this.props.handlAddToCart(product, this.state.quantity);
        this.setState({
            quantity: 1,
            isShowMessage: true
        })
    };

    showMessage = (name, quantity) => {
        return (
            <div className="col-md-12 px-0">
                <div className="message">
                    <p>{quantity} x “{name}” have been added to your cart.</p>
                    <Link to="/cart">VIEW CART</Link>
                </div>
            </div>
        );
    }

    showRating = rating => {

        let result = [];
        if (rating >= 0) {
            for (let i = 1; i <= rating; i++) {
                result.push(<i className="fas fa-star" key={'i' + i} />);
            }
            if (rating !== parseInt(rating)) {
                result.push(<i className="fas fa-star-half-alt" key={'rating' + rating} />);
            }
            for (let j = 1; j <= 5 - rating; j++) {
                result.push(<i className="far fa-star" key={'j' + j} />);
            }
        }
        return result
    }
    
    getProduct = () => {
        let { match} = this.props;
        let {products} = this.state;
        if(products.length > 0 && match.params.id !== 0) {
            return products.find(food => food.id ==  match.params.id);
        }
    }

    render() {
        console.log(this.props.match.params);
        // let { products } = this.props;
        let { quantity, isShowMessage, products} = this.state;

        return (
            <Fragment>

                {
                    products.length > 0
                    ? <ShopDetail
                        {...this.props}
                        product = {this.getProduct()}
                        quantity = {quantity}
                        isShowMessage = {isShowMessage}
                        handlAddToCart = {this.handlAddToCart}
                        showRating = {this.showRating}
                        handleChange = {this.handleChange}
                        handleIncreasehandleDecrease = {this.handleIncreasehandleDecrease}
                        showMessage = {this.showMessage}
                    />
                    : <span/>
                }

            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

function mapState({...user}) {
    return {
        products: user.products,
        user: user.user.data
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // handleFetchProductsRequest: () => {
        //     dispatch(actFetchProductsRequest());
        // },
        handlAddToCart: (product, quantity) => {
            dispatch(actAddToCart(product, quantity));
        },
        handleMessage: message => {
            dispatch(actMessage(message));
        }
    }
}

export default connect(mapState, mapDispatchToProps)(ShopDetailContainer);
