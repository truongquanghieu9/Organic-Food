import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from "contents/display/Shop";
import { apiCall } from "services/api";

import Shop from 'components/Shop/Shop';

import { actAddToCart } from 'store/actions/shop';

class ShopContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            productsPerPage: 12,
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

    filterProducts = (products) => {
        return products.filter((product) => {
            return product.status === 'sale';
        });
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

    handleClick = event => {
        this.setState({
            currentPage: +event.target.id
        });
    }

    renderProduct = (products) => {
        return products;
    }

    renderPageNumbers = (pageNumbers) => {
        let result = null;
        let active = '';
        if (pageNumbers !== undefined) {
            result = pageNumbers.map(number => {
                this.state.currentPage === number ? active = "active" : active = '';
                return <li className="page-item" key={number}>
                            <Link to='/shop' className={`page-link text-dark ${active}`} id={number} onClick={this.handleClick}>{number}</Link>
                        </li>
            })
        }
        return result;
    }

    render() {

        let { handlAddToCart } = this.props;
        let { currentPage, productsPerPage, products } = this.state;

        const pageNumbers = []

        // Logic for displaying todos
        if (products !== null) {
            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
            var currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

            // Logic for displaying page numbers
            for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
                pageNumbers.push(i);
            }
        }
        return (
            <Fragment>
                <Shop
                    products={products}
                    renderProduct={this.renderProduct}
                    currentProduct={currentProduct}
                    renderPageNumbers={this.renderPageNumbers}
                    handlAddToCart={handlAddToCart}
                    showRating={this.showRating}
                    pageNumbers={pageNumbers}
                    productStatus={this.productStatus}
                />
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

export default connect(mapState, mapDispatchToProps)(ShopContainer);
