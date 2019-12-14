import React from 'react';
import moment from "moment";

import ShopLayout from "contains/Layout/ShopLayout";

const OrderUser = ({order, user, detail, ...props}) => (
    <ShopLayout {...props}>
        <section className="cart">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 pl-0">
                        <table className="cart__table text-center table">
                            <thead>
                                <tr>
                                    <th>ITEM</th>
                                    <th>USER NAME</th>
                                    <th>DATE</th>
                                    <th>PAY TYPE</th>
                                    <th>STATUS</th>
                                    <th>TOTAL PRICE</th>
                                    <th>ORDER DETAIL</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody className="cart__body">
                                {
                                    order.map((item, i) => (
                                        <tr className="cart__item" key={i}>
                                            <td className="cart__thumbnail">
                                                {i}
                                            </td>
                                            <td className="cart__thumbnail">
                                                {user.viewname}
                                            </td>
                                            <td className="cart__subtotal">
                                                {
                                                    item.createdAt
                                                    ? moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss A")
                                                    : ""
                                                }
                                            </td>
                                            <td className="cart__subtotal">
                                                {item.pay_type}
                                            </td>
                                            <td className="cart__subtotal">
                                                <span className="amount">{item.status}</span>
                                            </td>
                                            <td className="cart__price">
                                                <span className="amount">{`$ ${item.totalPrice}.00`}</span>
                                            </td>
                                            <tr className="cart__footer">
                                                <td colSpan="3" className="cart__coupon text-left">
                                                    <button className="blog__button" onClick={() => detail(item._id)}>DETAIL</button>
                                                </td>
                                            </tr>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </ShopLayout>
);

export default OrderUser;