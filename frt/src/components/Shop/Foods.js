import React from 'react';
import {Link} from 'react-router-dom';

const Foods = ({handlAddToCart, showRating, product, productStatus}) => (
    <div className="item">
        <div className="products__thumbnail">
            <img src={product.image_id[0].link} alt={product.name} />
            <img src={product.src2} className="product_image_back" alt={product.name} />
            <div className="products__sale">
                {productStatus(product) === 'sale' ? <span className="onsale">SALE</span> : ''}
                {productStatus(product) === 'soldout' ? <span className="onsoldout">SOLD OUT</span> : ''}
                {productStatus(product) === 'hot' ? <span className="onhot">HOT</span> : ''}
            </div>
            <div className="products_group_button">
                <div className="add__cart products_group_item">

                    <a href="#" onClick={() => handlAddToCart(product)}><i className="fas fa-shopping-cart" /></a>

                    <span>Add to cart</span>
                </div>
                <div className="quick__view products_group_item">
                    <a href="/"><i className="fas fa-search" /></a>
                    <span>Quick View</span>
                </div>
                <div className="compare products_group_item">
                    <a href="/"><i className="fas fa-sync-alt" /></a>
                    <span>Compare</span>
                </div>
                <div className="wishlist products_group_item">
                    <a href="/"><i className="fas fa-heart" /></a>
                    <span>Wishlist</span>
                </div>
            </div>
        </div>
        <div className="products__info">
            <Link to={`/shop/${product._id}`}>{product.name}</Link>
            <div className="rating">
                {showRating(product.star)}
            </div>
            <span className="old__price">{product.price > product.discount ? `$ ${product.price}.00` : ""}</span>
            <span className="price">{`$ ${product.discount}.00`}</span>
        </div>
    </div>
)

export default Foods;
