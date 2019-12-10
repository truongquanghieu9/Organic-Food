import React, {useState, useEffect} from "react";
import { apiCall } from "services/api";
import api from "contents/display/Shop";
import {connect} from "react-redux";

import {actCheckout} from 'store/actions/shop';
import Checkout from "components/Shop/Checkout";

const DEFAULT_ORDER = {
    totalPrice: 0,
    pay_type: "",
    status: "Waiting"
}

const DEFAULT_PEOPLE = {
    fullname: "",
    address: "",
    phone: ""
}

function CheckoutContain({user, cart, ...props}) {
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [people, setPeople] = useState(DEFAULT_PEOPLE);
    const [stripeToken, setToken] = useState("");

    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function load() {
        try {
            setPeople(DEFAULT_PEOPLE);
            let getPeople = await apiCall(...api.user.getPeople(user._id));
            if(getPeople) setPeople(getPeople);
            setOrder(DEFAULT_ORDER);
            if(cart.length > 0) {
                let getTotalAmount = showTotalAmount(cart);
                setOrder(prev => ({...prev, totalPrice: getTotalAmount}));
            }
        } catch(err) {
            console.log("The load is error \n", err);
        }
    }
    
    function hdChange(e) {
        const {name, value} = e.target;
        setOrder(prev => ({...prev, [name]: value}));
        setPeople(prev => ({...prev, [name]: value}));
    }

    function showTotalAmount(cart) {
        let total = 0;
        for (let item of cart) {
            total += (item.product.discount * item.quantity);
        }
        return total;
    }

    async function hdConfirm() {
        try {
            let updatePeople = await apiCall(...api.people.update(user._id, people._id), people);
            
            // get data product in cart redux and convert follow database
            let orderDetails = cart.map(v => {
                const {quantity, product} = v;
                let {discount, _id} = product;
                let price = discount;
                return {
                    quantity, price,
                    food_id: _id,
                }
            })

            let newOrder = await apiCall(...api.orders.create(user._id), {order: order, orderDetails, stripeToken});
            if(updatePeople && newOrder) {
                actCheckout();
                // reload page to redux take state again from local storage
                window.location.reload();
                return props.history.push(`/shop`);  
            }            
        } catch(err) {
            console.log("The confirm is error \n", err);
        }
    }

    function getBackToken(token) {
        setToken(token.id);
    }

    return (
        <Checkout
            {...props}
            user = {user}
            cart = {cart}
            people = {people}
            order = {order}
            hdConfirm = {hdConfirm}
            hdChange = {hdChange}
            showTotalAmount = {showTotalAmount}
            getBackToken= {getBackToken}
        />
    );
}

function mapState({...user}) {
    return {
        cart: user.cart,
        user: user.user.data
    }
}

export default connect(mapState, {actCheckout})(CheckoutContain);