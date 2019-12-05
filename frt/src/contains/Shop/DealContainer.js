import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import api from "contents/display/Shop";
import { apiCall } from "services/api";

import Deal from 'components/Shop/Deal';
import DealItemCarouselNew from 'components/Shop/DealItemCarouselNew';
import DealItemNew from 'components/Shop/DealItemNew';

import { actAddToCart } from 'store/actions/shop';

class DealContainer extends Component {
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

    handlAddToCart = product => {
        this.props.handlAddToCart(product);
    };

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

    filterProducts = (products) => {
        return products.filter((product) =>
            product.price-product.discount > 0
        );
    }

    render() {
        let { products } = this.state;
        let filterSale = this.filterProducts(products);
        let prod = [];
        if(products.length > 0) {
            for(let i = 0; i < 8; i++){
                prod.push(filterSale[i]);
            }
        }

        return (
            <Fragment>
                <Deal>
                    <div className="col-md-4 px-0">
                        <div className="owl-carousel deal-carousel owl-theme">
                            {
                                filterSale.map((val, i) => (
                                    <DealItemCarouselNew
                                        product={val}
                                        key={i}
                                        handlAddToCart={this.props.handlAddToCart}
                                        showRating={this.showRating}
                                        productStatus={this.productStatus}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="col-md-8 pr-0">
                        <div className="row deal__items pl-3">
                        {
                            prod.map((val, i) => (
                                <DealItemNew
                                    product={val}
                                    key={i}
                                    handlAddToCart={this.props.handlAddToCart}
                                    showRating={this.showRating}
                                />
                            ))
                        }
                        </div>
                    </div>
                </Deal>
            </Fragment>
        );
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
        handlAddToCart: product => {
            dispatch(actAddToCart(product, 1));
        }
    }
}

export default connect(mapState, mapDispatchToProps)(DealContainer);
