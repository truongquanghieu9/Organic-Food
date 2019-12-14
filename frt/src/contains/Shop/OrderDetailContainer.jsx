import React, {useState, useEffect} from "react";
import { apiCall } from "services/api";
import api from "contents/display/Shop";
import {connect} from "react-redux";

import OrderDetail from "components/Shop/OrderDetail";

function OrderDetailContainer({user, cart, ...props}) {
    const [order, setOrder] = useState([]);

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
            let {order_id} = props.match.params;
            let getOrder = await apiCall(...api.orders.getOrderDetail(user._id, order_id));
            console.log(getOrder);
            setOrder(getOrder);
            
        } catch(err) {
            console.log("The load is error \n", err);
        }
    }

    return (
        <OrderDetail
            {...props}
            order = {order}
        />
    );
}

function mapState({...user}) {
    return {
        user: user.user.data
    }
}

export default connect(mapState, null)(OrderDetailContainer);