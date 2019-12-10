import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import api from "contents/display/Shop";
import { apiCall } from "services/api";

import Foods from 'components/Shop/Foods';

import { actAddToCart } from 'store/actions/shop';

class ProductsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        try {
            let listFood = await apiCall(...api.food.get());
            this.setState({products: listFood})
        } catch (err){
            console.log(err);
        }
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

    productStatus = (product) => {
        let status;
        if(product.quantity === 0){
            status = "soldout";
        } else if(product.price-product.discount > 0){
            status= "sale";
        } else if(product.quantity <= 90 || status === "sale"){
            status= "hot";
        }
        return status;
    } 

    render() {

        let { products } = this.state;
        return (
            <Fragment>
                <section className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 px-0">
                                <h3 className="heading__title">New Products</h3>
                            </div>
                            <div className="col-md-12 px-0 products__items">
                                <div className="owl-carousel owl-theme">

                                    {
                                        products.map((val, i) => (
                                            i > products.length - 20
                                            ?  <Foods
                                                    product={val}
                                                    key={i}
                                                    handlAddToCart={this.props.handlAddToCart}
                                                    showRating={this.showRating}
                                                    productStatus={this.productStatus}
                                                />
                                            : ""
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

function mapStateToProps({...user}) {
    return {
        products: user.products,
        user: user.user.data
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handlAddToCart: product => {
            dispatch(actAddToCart(product, 1));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
