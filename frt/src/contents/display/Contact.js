export default {
    api: {
        user: {
            get: () => `/api/user/getAll`,
            post: (user_id) => `/api/user/${user_id}/contact`,
        }
    },
    form: {
        box: {
            title: "Send mail",
            subtitle: "This is form for send mail for member"
        }
    }
}
