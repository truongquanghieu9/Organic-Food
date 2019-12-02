import React from 'react';
import {Link} from 'react-router-dom';
import CartItem from "components/Shop/CartItem";

import ProductsContainer from "contains/Shop/ProductsContainer";
import ShopLayout from "contains/Layout/ShopLayout";

const Cart = ({cart, fee, handleChange, showTotalAmount, products, quantity, handleDeleteCart, handleUpdateCart}) => (
    <ShopLayout>
         {/* Begin Cart */}
        <section className="cart">
            <div className="container">
                <div className="row">
                    {/* Begin CartTable */}
                    <div className="col-md-9 pl-0">
                        <table className="cart__table text-center table">
                            <thead>
                                <tr>
                                    <th colSpan={2}>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>TOTAL</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody className="cart__body">
                                {/* Begin CartItem */}
                                <CartItem
                                    cart={cart}
                                    quantity={quantity}
                                    handleChange={handleChange}
                                    handleDeleteCart={handleDeleteCart}
                                    handleUpdateCart={handleUpdateCart}
                                />
                                {/* End CartItem */}
                                <tr className="cart__footer">
                                    <td colSpan="3" className="cart__coupon text-left">
                                        <input type="text" placeholder="Coupon code" />
                                        <button className="blog__button ml-2">APPLY COUPON</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    {/* End CartTable */}
                    {/* Begin CartTotal */}                   
                    <div className="col-md-3 px-0">
                        <div className="cart__total">
                            <table className="table">
                                <tbody className="table__total">
                                    <tr>
                                        <td colSpan={2}>
                                            <span className="total__header">CART TOTALS</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td className="amount">$ {showTotalAmount(cart)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>
                                            <label>
                                                <input type="radio" name="fee" value={0} onChange={handleChange} defaultChecked /> Free shipping
                                            </label>
                                            <label>
                                                <input type="radio" name="fee" value={10} onChange={handleChange} /> Local Pickup: <span className="amount">$10.00</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td className="amount">${showTotalAmount(cart) + +fee}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <button className="blog__button__green"><Link to="/checkout">PROCEED TO CHECKOUT</Link></button>
                                            <button className="blog__button__inverse"><Link to='/shop'>CONTINUE SHOPPING</Link></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* End CartTotal */}
                </div>
            </div>
        </section>
        {/* End Cart */}
        <ProductsContainer products={products}/>
    </ShopLayout>
)

export default Cart;