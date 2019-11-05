export default {
    api: {
        create: (user_id) => `/api/user/${user_id}/categories`,
        get: (user_id) => `/api/user/${user_id}/categories`,
        getOne: (user_id, category_id) => `/api/user/${user_id}/categories/${category_id}`,
        delete: (user_id, category_id) => `/api/user/${user_id}/categories/${category_id}`,
        update: (user_id, category_id) => `/api/user/${user_id}/categories/${category_id}`,
    },
    table: {
        category: {
            card: {
                title: "Category List",
                subtitle: "Category of shop"
            },
            header: ["ID", "Name", "Description", "Options"],
            empty: "There is no category information to show here."
        }
    },
    form: {
        box: {
            title: "Create New category",
            subtitle: "Here is a subtitle for this table"
        }
    }
}
