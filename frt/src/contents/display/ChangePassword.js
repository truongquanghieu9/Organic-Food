export default {
    api: {
        updatePassword: (user_id) => `/api/user/${user_id}/password`
    },
    form: {
        box: {
            title: "Account",
            subtitle: "Change the password of your account"
        }
    }
}
