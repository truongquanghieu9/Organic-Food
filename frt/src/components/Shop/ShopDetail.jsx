import React from 'react';
import ShopLayout from "contains/Layout/ShopLayout";
import ProductView from "contains/Shop/ProductsContainer";

const ShopItemNew = ({product, quantity, isShowMessage, handlAddToCart, showRating, handleChange, handleIncreasehandleDecrease, showMessage, productStatus}) => (
    <ShopLayout>
        <div>
            {/* BEGIN SHOP ITEM */}
            <section className="shop__item">
                <div className="container px-0">
                    <div className="row">
                        {isShowMessage ? showMessage(product.name, quantity) : ''}
                        <div className="col-md-6 item__image pl-0">
                            <div className="item-carousel owl-carousel owl-theme">
                                {
                                    product.image_id.map((item, i) => (
                                        <div className="item" key={i}><img src={item.link} alt="" /></div>
                                    ))
                                }
                            </div>
                            <div className="product__image ml-auto">
                                <img src={product.image_id[0].link} alt="" />
                                <div className="products__sale">
                                    {productStatus(product) === 'sale' ? <span className="onsale">SALE</span> : ''}
                                    {productStatus(product) === 'soldout' ? <span className="onsoldout">SOLD OUT</span> : ''}
                                    {productStatus(product) === 'hot' ? <span className="onhot">HOT</span> : ''}
                                </div>
                                <a href="#1" className="btn__play"><i className="far fa-play-circle" /></a>
                            </div>
                        </div>
                        <div className="col-md-6 item__content">
                            <div className="item__info">
                                <div className="rating">
                                    <span>{showRating(product.star)}</span>
                                    <a href="#1"><i className="fas fa-pencil-alt" /> 3 Reviews</a>
                                </div>
                                <p>Social good making progress catalytic effect diversity social responsibility Peace Corps
                                    Bloomberg. Safeguards, prevention; education crisis management positive social change.
                                    Plumpy’nut honor planned giving development, Jane Addams justice change-makers economic independence think tank.</p>
                                <div className="meta">

                                    {product.quantity > 0 ?
                                        <span className="stock">Availability: <span><i className="far fa-check-circle" /> In Stock </span></span> :
                                        <span className="outStock">Availability: <span><i className="far fa-clock"></i> Out Of Stock </span></span>
                                    }

                                    <span className="sku pl-5">Sku: <span>00{product._id}</span></span>
                                </div>
                            </div>
                            <hr />
                            <div className="price">
                                <h1>{`$ ${product.discount}.00`}</h1>
                            </div>
                            <div className="add__cart d-flex align-items-center">
                                <div className="quantity d-flex">

                                    <input type="number" min={1} max={product.quantity} value={quantity} name="quantity" onChange={handleChange} />

                                    <div className="plus__minus">

                                        <a href="#1" onClick={() => handleIncreasehandleDecrease(+1)} className="btn__plus">+</a>
                                        <a href="#1" onClick={() => handleIncreasehandleDecrease(-1)} className="btn__minus">-</a>

                                    </div>
                                </div>
                                {
                                    productStatus(product) === 'soldout' 
                                    ? <button onClick={() => handlAddToCart(product)} className="btnDisable" disabled><i className="fas fa-shopping-cart"  /> ADD TO CART</button>
                                    : <button onClick={() => handlAddToCart(product)} className="btnAdd"><i className="fas fa-shopping-cart"  /> ADD TO CART</button>
                                }
                                
                                <div className="extra">
                                    <a href="#1"><i className="far fa-heart" /></a>
                                </div>
                                <div className="extra">
                                    <a href="#1"><i className="fas fa-sync-alt" /></a>
                                </div>
                                <div className="extra">
                                    <a href="#1"><i className="far fa-envelope" /></a>
                                </div>
                            </div>
                            <hr />
                            <div className="meta__link">
                                <div className="cats__link">
                                    <span>Categories: </span><span className="cats__link"><a href="#1">{product.category_id.name}</a></span>
                                </div>
                                <div className="tags__link"><span>Tags: </span><span className="tags__link">
                                    <a href="#1">boxshop</a>, <a href="#1">theme-sky</a>, <a href="#1">woocommerce</a>, <a href="#1">wordpress</a></span>
                                </div>
                                <ul className="meta__social">
                                    <li className="twitter">
                                        <a href="#1" target="_blank"><i className="fab fa-twitter" />Tweet</a>
                                    </li>
                                    <li className="facebook">
                                        <a href="#1" target="_blank"><i className="fab fa-facebook-f" />Share</a>
                                    </li>
                                    <li className="google-plus">
                                        <a href="#1" target="_blank"><i className="fab fa-google-plus-g" />Google+</a>
                                    </li>
                                    <li className="pinterest">
                                        <a href="#1" target="_blank"><i className="fab fa-pinterest" />Pinterest</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END SHOP ITEM */}
            {/* BEGIN ITEM DESCRIPT */}
            <section className="item__descript">
                <div className="container px-0">
                    <div className="row des__content">
                        <div className="col-md-12 px-0">
                            <ul className="nav nav-pills" role="tablist">
                                <li className="nav-item pr-2">
                                    <a className="nav-link active" data-toggle="pill" href="#home"><i className="fas fa-pencil-alt" />
                                        DESCRIPTION</a>
                                </li>
                                <li className="nav-item pr-2">
                                    <a className="nav-link" data-toggle="pill" href="#menu1"><i className="fas fa-tag" /> REVIEW (3)</a>
                                </li>
                                <li className="nav-item pr-2">
                                    <a className="nav-link" data-toggle="pill" href="#menu2"><i className="fas fa-comments" /> CUSTOM TAB</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="home" className="container tab-pane active"><br />
                                    <h6>Paragraph text</h6>
                                    <p style={{ marginBottom: '25px' }}>Nam tristique porta ligula, vel viverra sem eleifend nec.
                                        Nulla sed purus augue, eu euismod tellus. Nam mattis eros nec mi sagittis sagittis.
                                        Vestibulum suscipit cursus bibendum. Integer at justo eget sem auctor auctor eget vitae arcu. Nam tempor malesuada porttitor. Nulla quis dignissim ipsum.</p>
                                    <h6>Unordered list</h6>
                                    <p style={{ marginBottom: '25px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                                        Maecenas ullamcorper est et massa mattis condimentum.<br />
                                        Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.<br />
                                        Etiam nec massa et lectus faucibus ornare congue in nunc.<br />
                                        Mauris eget diam magna, in blandit turpis.</p>
                                    <h6>Ordered list</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                                        Maecenas ullamcorper est et massa mattis condimentum.<br />
                                        Vestibulum sed massa vel ipsum imperdiet malesuada id tempus nisl.<br />
                                        Etiam nec massa et lectus faucibus ornare congue in nunc.<br />
                                        Mauris eget diam magna, in blandit turpis.</p>
                                </div>
                                <div id="menu1" className="container tab-pane fade"><br />
                                    <p>Your custom content goes here. You can add the content for individual product</p>
                                </div>
                                <div id="menu2" className="container tab-pane fade"><br />
                                    <p>Your custom content goes here. You can add the content for individual product</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END ITEM DESCRIPT */}
        </div>
        
        <ProductView/>
    </ShopLayout>
)

export default ShopItemNew;