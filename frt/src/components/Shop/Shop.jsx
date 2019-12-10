import React, { Fragment } from 'react';
import ShopLayout from "contains/Layout/ShopLayout";
import ShopItem from "./ShopItem";

const Shop = ({products, currentProduct, pageNumbers, renderPageNumbers, handlAddToCart, showRating, productStatus}) => (
    <ShopLayout>
        <Fragment>

            {/* BEGIN SHOP */}
            <section className="shop pt-5">
                <div className="container">
                    <div className="row sort__filter align-items-center">
                        <div className="col-md-6">
                            <div className="sort">
                                <a href="#1"><i className="fas fa-th" /></a>
                                <a href="#1"><i className="fas fa-th-list" /></a>
                                <select className="sort__select">
                                    <option value="newness">Sort by newness</option>
                                    <option value="popularity">Sort by popularity</option>
                                    <option value="rating">Sort by avarage rating</option>
                                    <option value="low">Sort by price low to high</option>
                                    <option value="high">Sort by price high to low</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 text-right">
                            <div className="filter">
                                <span className="pr-4 showing">Showing 1–12 of {`${products.length}`} results</span>
                                <span className="pl-4 filter__bar"><a href="#1">Filter <i className="fas fa-bars" /></a></span>
                            </div>
                        </div>
                    </div>
                    <div className="row shop__items">
                        <ShopItem
                            item = {currentProduct}
                            handlAddToCart={handlAddToCart}
                            showRating={showRating}
                            productStatus={productStatus}
                        />

                    </div>
                </div>
            </section>
            {/* END SHOP */}

            {/* BEGIN PAGINATION */}
            <section className="pagination">
                <ul className="pagination mx-auto py-5">
                    {renderPageNumbers(pageNumbers)}
                </ul>
            </section>
            {/* END PAGINATION */}

        </Fragment>
    </ShopLayout>
)

export default Shop;