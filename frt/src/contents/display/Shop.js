const category = {
    get: () => ["get", "/api/categories"]
};

const food = {
    get: () => ["get", "/api/foods"],
    getOne: (id) => ["get", `/api/foods/${id}`]
}

const user = {
    getOne: (user_id) => ["get", `/api/user/${user_id}`],
    getPeople: (user_id) => ["get", `/api/user/${user_id}/getpeople`],
    getUserOrdered: (user_id) => ["get", `/api/user/${user_id}/getUserOrdered`]
}

const people = {
    getOne: (user_id, people_id) => ["get", `/api/user/${user_id}/people/${people_id}`],
    update: (user_id, people_id) => ["put", `/api/user/${user_id}/people/${people_id}`]
}

const orders = {
    get: (user_id) => ["get", `/api/user/${user_id}/orders`],
    create: (user_id) => ["post", `/api/user/${user_id}/orders`],
    delete: (user_id, order_id) => ["delete", `/api/user/${user_id}/orders/${order_id}`],
    update: (user_id, order_id) => ["put", `/api/user/${user_id}/orders/${order_id}`],
    getOrderDetail: (user_id, order_id) => ["get", `/api/user/${user_id}/orders/${order_id}/orderDetail`],
}

export default {
    category, food, people, user, orders
}