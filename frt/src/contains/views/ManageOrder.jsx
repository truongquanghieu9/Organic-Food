import React, {useState, useEffect} from "react";
import ManageOrder from "components/views/ManageOrder";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

function ManageOrderContain({ api, user, notify, ...props}) {
    const [orders, setOrders] = useState([]);

    async function load() {
        try {
            let getOrder = await apiCall("get", api.order.get(user._id));
            setOrders(getOrder);
        } catch(err) {
            notify();
        }
    }

    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function hdUpdateStatus(order_id, status) {
        try {
            let updateOrder = await apiCall("put", api.order.updateStatus(user._id, order_id), {status});
            let newOrders = orders.map(o => {
                if(o._id === updateOrder._id) {
                    return {
                        ...o,
                        status: updateOrder.status
                    }
                }
                return {...o};
            })
            setOrders(newOrders);
            await load();
            return notify("Update order status successfully!", true);
        } catch (err) {
            console.log(err);
            notify("Order status is not updated");
        }
    }

    function hdOrderDetail(order_id) {
        props.history.push(`/app/orders/${order_id}`);
    }


    return <ManageOrder
        {...props}
        orders = {orders}
        setOrders = {setOrders}
        hdUpdateStatus= {hdUpdateStatus}
        hdOrderDetail = {hdOrderDetail}
    />
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, null)(withNoti(ManageOrderContain));