const food = {
    create: (user_id) => `/api/user/${user_id}/foods`,
    get: (user_id) => `/api/user/${user_id}/foods`,
    getOne: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
    delete: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
    update: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`
}

const category = {
    get: (user_id) => `/api/user/${user_id}/categories`
}

export default {
    food, category
};
