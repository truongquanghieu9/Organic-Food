import React from 'react';

const CartItem = ({cart, quantity, handleChange, handleDeleteCart, handleUpdateCart}) => (
    cart.map((item, i) => (
        <tr className="cart__item" key={i}>
            <td className="cart__thumbnail">
                <a href="#1"><img src={item.product.image_id[0].link} alt="#"/></a>
            </td>
            <td className="cart__name">
                {item.product.name}
            </td>
            <td className="cart__price">
                <span className="amount">{`$ ${item.product.discount}.00`}</span>
            </td>
            <td className="cart__quantity">
                <div className="quantity d-flex">
                    <input name ="quantity" type="number" min={1} value={item.quantity} onChange={handleChange} onKeyUp={() => handleUpdateCart(item.product._id, quantity)} />
                    <div className="plus__minus">
                        <a onClick={() => handleUpdateCart(item.product._id, +item.quantity + 1)} href="#1" className="btn__plus">+</a>
                        <a onClick={() => handleUpdateCart(item.product._id, +item.quantity - 1)} href="#1" className="btn__minus">-</a>
                    </div>
                </div>
            </td>
            <td className="cart__subtotal">
                <span className="amount">{`$ ${item.product.discount * item.quantity}.00`}</span>
            </td>
            <td className="cart__remove">
                <div onClick={() => handleDeleteCart(item.product._id)} className="btn__remove">
                    <span className="remove">×</span>
                </div>
            </td>
        </tr>
    ))
)

export default CartItem;
