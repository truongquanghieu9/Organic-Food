import DashboardContain from "contains/views/Dashboard";
import ActivateContain from "contains/views/Activate";
import ActivatedContain from "contains/views/Activated";
import ManageCategoryContain from "contains/views/ManageCategory";
import ManageFoodContain from "contains/views/ManageFood";
import ChangePasswordContain from "contains/views/ChangePassword";
import ProfileContain from "contains/views/Profile";
import Contact from "contains/views/Contact";

import Login from "components/views/Login";

import Dashboard from "@material-ui/icons/Dashboard";
import Category from "@material-ui/icons/Category";
import Food from "@material-ui/icons/Spa";

import dashboard from "./display/Dashboard";
import login from "./display/Login";
import register from "./display/Register";
import activate from "./display/Activate";
import activated from "./display/Activated";
import manage_category from "./display/ManageCategory";
import manage_food from "./display/ManageFood";
import change_password from "./display/ChangePassword";
import profile from "./display/Profile";
import contact_User from "./display/Contact";


const sidebar = [
    {
        path: "/dashboard",
        access: ["ownerAccess", "peopleAccess"],
        name: "Dashboard",
        Component: DashboardContain,
        icon: Dashboard,
        display: dashboard
    },
    {
        path: "/category",
        access: ["ownerAccess"],
        name: "Manage Categories",
        Component: ManageCategoryContain,
        icon: Category,
        display: manage_category
    },
    {
        path: "/food",
        access: ["ownerAccess"],
        name: "Manage Foods",
        Component: ManageFoodContain,
        icon: Food,
        display: manage_food
    }
]

const routes = [
    {
        path: "/login",
        access: ["guestAccess"],
        Component: Login,
        display: login
    },
    {
        path: "/register",
        access: ["guestAccess"],
        Component: Login,
        display: register
    },
    {
        path: "/activate/:user_id",
        access: ["guestAccess"],
        Component: ActivatedContain,
        display: activated
    },
    {
        path: "/activate",
        access: ["guestAccess"],
        Component: ActivateContain,
        display: activate
    },
    {
        path: "/account",
        access: ["ownerAccess", "peopleAccess"],
        name: "Your Account",
        Component: ChangePasswordContain,
        display: change_password
    },
    {
        path: "/profile",
        access: ["ownerAccess", "peopleAccess"],
        name: "User Profile Information",
        Component: ProfileContain,
        display: profile
    },
    {
        path: "/contact",
        access: ["ownerAccess"],
        name: "Send mail to user",
        Component: Contact,
        display: contact_User
    }
]

export {sidebar};

export default [...routes, ...sidebar ];
