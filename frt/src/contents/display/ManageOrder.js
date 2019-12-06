export default {
    api: {
        order: {
            get: (user_id) => `/api/user/${user_id}/orders`,
            getOne: (user_id, order_id) => `/api/user/${user_id}/orders/${order_id}`,
            updateStatus: (user_id, order_id) => `/api/user/${user_id}/orders/${order_id}`,
        }
    }
}
