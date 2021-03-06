import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DealItemCarousel = ({product, showRating, handlAddToCart}) => (
    <Fragment>
        <div className="carousel__item">
            <div className="products__thumbnail">
                <img src={product.image_id[0].link} alt="" />
                <img src={product.image_id[1].link} className="product_image_back" alt={product.name} />
                <div className="products__sale">
                    <span className="onsale">SALE</span>
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
                <Link to={`/shop/${product._id}`}>{product.name}</Link>
                <div className="rating">

                    {showRating(product.rating)}

                </div>
                <span className="old__price">{product.price > product.discount ? `$ ${product.price}.00` : ""}</span>
                <span className="price">{`$ ${product.discount}.00`}</span>
            </div>
        </div>
    </Fragment>
)

export default DealItemCarousel;
