import bg from "assets/img/loginBg.jpg"

export default {
    bg,
    bgColor: "rgba(0, 0, 0, 0.5)",
    title: "Your Organic Food account has been activated,",
    message: "You are now a part of Organic Food community, no more actions required. We wish you to have a good time using our system.",
    button: "Get to the Homepage",
    api: {
        getOne: user_id => `/api/user/${user_id}`,
        activate: user_id => `/api/user/${user_id}/activate`
    }
}
