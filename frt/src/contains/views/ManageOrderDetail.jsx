import React, {useState, useEffect} from "react";
import ManageOrderDetail from "components/views/ManageOrderDetail";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

function ManageOrderDetailContain({ api, user, notify, ...props}) {
    const [order, setOrder] = useState([]);

    async function load() {
        try {
            let {order_id} = props.match.params;
            let getOrderDetail = await apiCall("get", api.order.getOrderDetai(user._id, order_id));
            setOrder(getOrderDetail);
            console.log(getOrderDetail);
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

    return <ManageOrderDetail
        {...props}
        order = {order}
        setOrder = {setOrder}
    />
}

function mapState({user}) {
    return {
        user: user.data
    }
}

export default connect(mapState, null)(withNoti(ManageOrderDetailContain));