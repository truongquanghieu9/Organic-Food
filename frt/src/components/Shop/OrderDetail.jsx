import React from 'react';

import ShopLayout from "contains/Layout/ShopLayout";

const OrderDetail = ({order, ...props}) => (
    <ShopLayout {...props}>
        <section className="cart">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 pl-0">
                        <table className="cart__table text-center table">
                            <thead>
                                <tr>
                                    <th>ITEM</th>
                                    <th>IMAGE</th>
                                    <th>FOOD TYPE</th>
                                    <th>NAME</th>
                                    <th>QUANTITY</th>
                                    <th>PRICE</th>
                                    <th>TOTAL PRICE</th>
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
                                                <a href="#1">
                                                    <img src={item.food_id.image_id[0].link} alt={item.name}/>
                                                </a>
                                            </td>
                                            <td className="cart__subtotal">
                                                {item.food_id.category_id.name}
                                            </td>
                                            <td className="cart__subtotal">
                                                {item.food_id.name}
                                            </td>
                                            <td className="cart__subtotal">
                                                {item.quantity}
                                            </td>
                                            <td className="cart__subtotal">
                                                <span className="amount">{`$ ${item.price}.00`}</span>   
                                            </td>
                                            <td className="cart__price">
                                                <span className="amount">{`$ ${item.price*item.quantity}.00`}</span>
                                            </td>
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
)

export default OrderDetail;