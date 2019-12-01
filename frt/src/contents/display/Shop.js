const category = {
    get: () => ["get", "/api/categories"]
};

const food = {
    get: () => ["get", "/api/foods"],
    getOne: (id) => ["get", `/api/foods/${id}`]
}

export default {
    category, food
}