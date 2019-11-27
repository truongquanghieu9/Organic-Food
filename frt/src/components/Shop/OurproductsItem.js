import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const OurProductsItem = ({ product, handlAddToCart, showRating}) => (
    <Fragment>
        <div className="col-md-3 pt-5">
            <div className="item">
                <div className="products__thumbnail">
                    <img src={product.src1} alt={product.name} />
                    <img src={product.src2} className="product_image_back" alt={product.name} />
                    <div className="products__sale">
                        {product.status === 'sale' ? <span className="onsale">SALE</span> : ''}
                        {product.status === 'soldout' ? <span className="onsoldout">SOLD OUT</span> : ''}
                        {product.status === 'sale' ? <span className="onsale">HOT</span> : ''}
                    </div>
                    <div className="products_group_button">
                        <div className="add__cart products_group_item">
                            <a href="#1" onClick={() => handlAddToCart(product)}><i className="fas fa-shopping-cart" /></a>
                            <span>Add to cart</span>
                        </div>
                        <div className="quick__view products_group_item">
                            <a href="#1"><i className="fas fa-search" /></a>
                            <span>Quick View</span>
                        </div>
                        <div className="compare products_group_item">
                            <a href="#1"><i className="fas fa-sync-alt" /></a>
                            <span>Compare</span>
                        </div>
                        <div className="wishlist products_group_item">
                            <a href="#1"><i className="fas fa-heart" /></a>
                            <span>Wishlist</span>
                        </div>
                    </div>
                </div>
                <div className="products__info">
                    <Link to={`/shop/${product.id}`}>{product.name}</Link>
                    <div className="rating">

                        {showRating(product.rating)}

                    </div>
                    <span className="old__price">{product.oldPrice > product.newPrice ? `$ ${product.oldPrice}.00` : ""}</span>
                    <span className="price">{`$ ${product.newPrice}.00`}</span>
                </div>
            </div>
        </div>
    </Fragment>
)


// class OurProductsItem extends Component {
//     render() {
//
//         let { product, handlAddToCart, showRating } = this.props;
//
//         return (
//
//         );
//     }
// }

export default OurProductsItem;
