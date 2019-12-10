import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from "contents/display/Shop";
import { apiCall } from "services/api";

import OurProducts from 'components/Shop/OurProducts';
import OurProductsItem from 'components/Shop/OurproductsItem';

import { actAddToCart } from 'store/actions/shop';

class OurProductsContainer extends Component {
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

    rand = (products) => {
        let prod = [];
        if(products.length > 0) {
            for(let i = 0; i < 8; i++){
                prod.push(products[Math.floor(Math.random() * products.length)])
            }
        }
        return prod;
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

    //Flattens passed array in one dimensional array
    flatten = (arr) => {
        const result = []
        arr.forEach((i) => {
            if (Array.isArray(i)) {
                result.push(...this.flatten(i))
            } else {
            result.push(i)
            }
        })
        return result;
    }

    getCategory = (products) => {
        return products.map(x => x.category_id.name);
    }

    //unique values in an array
    unique = (array) => {
        return array.filter(function (x, i, a) {
            return a.indexOf(x) === i;
        });
    }

    filterProducts = (products, key) => {
        return products.filter(product => product.category_id.name === key);
    }

    render() {

        let { products } = this.state;
        // take 8 product
        let rands = this.rand(products);

        // get unique category by newCate
        // let cate = this.getCategory(products);
        // let newCate = this.unique(cate);

        // filter product by "key"
        // let arr = this.filterProducts(products, "juices");
        return (
            <OurProducts>
                {
                    rands.map((val, i) => (
                        <OurProductsItem
                            product={val}
                            key={i}
                            handlAddToCart={this.props.handlAddToCart}
                            showRating={this.showRating}
                            productStatus={this.productStatus}
                        />
                    ))
                }
            </OurProducts>
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

export default connect(mapState, mapDispatchToProps)(OurProductsContainer);
