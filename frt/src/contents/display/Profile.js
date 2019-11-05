export default {
    api: {
        people: {
            getOne: (user_id, people_id) => `/api/user/${user_id}/people/${people_id}`,
            update: (user_id, people_id) => `/api/user/${user_id}/people/${people_id}`
        },
        user: {
            getOne: (user_id) => `/api/user/${user_id}`,
            update: (user_id) => `/api/user/${user_id}`
        }
    },
    form: {
        box: {
            title: "Change Profile",
            subtitle: "This is your profile information"
        }
    }
}
