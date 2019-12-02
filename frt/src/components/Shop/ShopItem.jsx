import React from 'react';
import {Link} from 'react-router-dom';

const ShopItem = ({item, handlAddToCart, showRating, productStatus}) => (
    item.map((product, i) => (
        <div className="col-md-3 pt-5" key={i}>
            <div className="item">
                <div className="products__thumbnail">
                    <img src={product.image_id[0].link} alt="" />
                    <img src={product.image_id[1].link} className="product_image_back" alt={product.name} />
                    <div className="products__sale">
                        {productStatus(product) === 'sale' ? <span className="onsale">SALE</span> : ''}
                        {productStatus(product) === 'soldout' ? <span className="onsoldout">SOLD OUT</span> : ''}
                        {productStatus(product) === 'hot' ? <span className="onhot">HOT</span> : ''}
                    </div>
                    <div className="products_group_button">
                        <div className="add__cart products_group_item">

                            <a onClick={() => handlAddToCart(product)}><i className="fas fa-shopping-cart" /></a>

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
        </div>
    ))
)


export default ShopItem;