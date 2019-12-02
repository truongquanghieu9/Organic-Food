import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

import ShopLayout from "contains/Layout/ShopLayout";

const Checkout = ({cart, fee, showTotalAmount, handleChange}) => (
    <ShopLayout>
        <Fragment>
            {/* BEGIN ACCOUNT */}
            <section className="cart account py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-7">
                            <h4><b>CUSTOMER INFORMATION</b></h4>
                            <form>
                                <div className="form-group">
                                    <label >Full name <span style={{ color: 'red' }}>*</span></label>
                                    <input required type="text" className="form-control" name="viewname" />
                                </div>
                                <div className="form-group">
                                    <label >Email <span style={{ color: 'red' }}>*</span></label>
                                    <input required type="email" className="form-control" name="email" />
                                </div>
                                <div className="form-group">
                                    <label >Address: <span style={{ color: 'red' }}>*</span></label>
                                    <input required type="text" className="form-control" name="address" />
                                </div>
                                <div className="form-group">
                                    <label >Phone number: <span style={{ color: 'red' }}>*</span></label>
                                    <input required type="phone" className="form-control" name="phone" />
                                </div>

                                <div className="form-group form-check px-0">
                                    <button type="submit" className="btn btn-primary mr-5">Checkout Now</button>
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" /> I want to checkout
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5">
                            <h4><b>YOUR PAYMENT TYPE</b></h4>
                            <div className="cart__total">
                                <table className="table">
                                    <tbody className="table__total">
                                        <tr>
                                            <td colSpan={2}>
                                                <span className="total__header">CART TOTALS</span>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>Subtotal</td>
                                            <td className="amount">$ 00</td>
                                        </tr> */}
                                        <tr>
                                            <td>Shipping</td>
                                            <td>
                                                <label>
                                                    <input type="radio" name="fee" value={0} onChange="" defaultChecked /> CoD (Cash on delivery)
                                                </label>
                                                <br/>
                                                <label>
                                                    <input type="radio" name="fee" value={10} onChange="" /> Online check payments: <img src="/img/checkout.png" alt=""/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td className="amount">$00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button className="blog__button__green"><Link>CHECKOUT NOW</Link></button>
                                                <button className="blog__button__inverse"><Link to='/shop'>CONTINUE SHOPPING</Link></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END ACCOUNT */}
        </Fragment>
    </ShopLayout>
)

export default Checkout;