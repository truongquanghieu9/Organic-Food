import bg from "assets/img/loginBg.jpg"

export default {
    bg,
    bgColor: "rgba(0, 0, 0, 0.5)",
    heading: "Sign up",
    intro: "Please enter your account to complete your registration.",
    link: {
        to: "/login",
        text: "Already a member?"
    },
    input: [
        {
            placeholder: "Email",
            name: "email",
            icon: "far fa-envelope"
        },
        {
            type: "password",
            placeholder: "Password",
            name: "password",
            icon: "fas fa-key"
        },
        {
            type: "password",
            placeholder: "Confirm Password",
            name: "conpassword",
            icon: "fas fa-key"
        }
    ],
    button: {
        cssClass: "signup",
        text: "Create account"
    },
    api: "/api/user/signup"
}
