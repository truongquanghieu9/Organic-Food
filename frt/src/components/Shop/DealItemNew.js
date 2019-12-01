import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DealItem = ({ product,showRating }) => (
    <Fragment>
        <div className=" col-md-6 px-0">
            <div className="row deal__item">
                <div className="col-md-5">
                    <div className="products__thumbnail">
                    <div className="products__sale">
                        <span className="onsale">sale</span>
                    </div>
                        <img src={product.image_id[0].link} alt="" />
                    </div>
                </div>
                <div className="col-md-7 px-0">
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
        </div>
    </Fragment>
);

export default DealItem;
