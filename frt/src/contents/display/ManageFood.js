export default {
    api: {
        food: {
            create: (user_id) => `/api/user/${user_id}/foods`,
            get: (user_id) => `/api/user/${user_id}/foods`,
            getOne: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
            delete: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`,
            update: (user_id, food_id) => `/api/user/${user_id}/foods/${food_id}`
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
            header: ["ID", "Name", "Quantity", "Price", "Discount", "Image", "Category", "Options"],
            empty: "There is no food information to show here."
        }
    },
    form: {
        box: {
            title: "Create New food",
            subtitle: "Here is a subtitle for this table"
        },
        info: {
            title: "New Food Information",
            subtitle: "Please fill in suitable information"
        },
        image: {
            title: "New Image",
            subtitle: "Please drop image for food"
        }
    },
    submit: {
        uploadImage: {
            type: ['image/*']
        }
    }
}
