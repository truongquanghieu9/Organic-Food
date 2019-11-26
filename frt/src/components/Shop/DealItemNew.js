import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DealItem = ({ product,showRating }) => (
    <Fragment>
        <div className=" col-md-6 px-0">
            <div className="row deal__item">
                <div className="col-md-5">
                    <div className="products__thumbnail">
                        <img src={product.src1} alt={product.name} />
                    </div>
                </div>
                <div className="col-md-7 px-0">
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
        </div>
    </Fragment>
);

export default DealItem;
