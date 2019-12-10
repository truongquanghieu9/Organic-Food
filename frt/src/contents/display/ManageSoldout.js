export default {
    api: {
        food: {
            create: (user_id) => `/api/user/${user_id}/foods`,
            get: (user_id) => `/api/user/${user_id}/foods`,
            getOne: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
            delete: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
            update: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
            updateQuantity: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}/updateQuantity`
        },
        category: {
            get: (user_id) => `/api/user/${user_id}/categories`
        }
    },
    table: {
        food: {
            card: {
                title: "Food List",
                subtitle: "Food of shop"
            },
            header: ["ID", "Category", "Name", "Rating", "Quantity", "Price", "Discount", "Image", "Options"],
            empty: "There is no food information to show here."
        }
    }
}
