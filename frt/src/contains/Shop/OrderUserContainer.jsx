import React, {useState, useEffect} from "react";
import { apiCall } from "services/api";
import api from "contents/display/Shop";
import {connect} from "react-redux";

import OrderUser from "components/Shop/OrderUser";

function OrderUserContainer({user, ...props}) {
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
            let getOrder = await apiCall(...api.user.getUserOrdered(user._id));
            setOrder(getOrder);
            
        } catch(err) {
            console.log("The load is error \n", err);
        }
    }

    function detail(order_id) {
        return props.history.push(`/order/${order_id}`);  
    }

    return (
        <OrderUser
            {...props}
            user = {user}
            order = {order}
            detail = {detail}
        />
    );
}

function mapState({...user}) {
    return {
        user: user.user.data
    }
}

export default connect(mapState, null)(OrderUserContainer);