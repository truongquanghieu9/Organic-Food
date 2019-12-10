import DashboardContain from "contains/views/Dashboard";
import ActivateContain from "contains/views/Activate";
import ActivatedContain from "contains/views/Activated";
import ManageCategoryContain from "contains/views/ManageCategory";
import ManageFoodContain from "contains/views/ManageFood";
import ManageOrderContain from "contains/views/ManageOrder";
import ManageOrderDetailContain from "contains/views/ManageOrderDetail";
import ManageSoldoutContain from "contains/views/ManageSoldout";
import GeneralStatisticContain from "contains/views/GeneralStatistic";
import ChangePasswordContain from "contains/views/ChangePassword";
import ProfileContain from "contains/views/Profile";
import Contact from "contains/views/Contact";

import Login from "components/views/Login";

import Dashboard from "@material-ui/icons/Dashboard";
import Category from "@material-ui/icons/Category";
import Food from "@material-ui/icons/Spa";
import Order from '@material-ui/icons/LocalMall';
import Soldout from '@material-ui/icons/RemoveShoppingCart';
import Report from '@material-ui/icons/InsertChartOutlinedOutlined';

import CartContain from "contains/Shop/CartContainer";
import ShopDetailContain from "contains/Shop/ShopDetailContainer";
import ShopContain from "contains/Shop/ShopContainer";
import Portfolio from "contains/Shop/PortfolioContainer";
import Blog from "components/Shop/Blog";
import Account from "components/Shop/Account";
import CheckoutContain from "contains/Shop/CheckoutContainer";
import HomePage from "components/Page/HomePage";

import dashboard from "./display/Dashboard";
import login from "./display/Login";
import register from "./display/Register";
import activate from "./display/Activate";
import activated from "./display/Activated";
import manage_category from "./display/ManageCategory";
import manage_food from "./display/ManageFood";
import manage_order from "./display/ManageOrder";
import manage_soldout from "./display/ManageSoldout";
import general_statistic from "./display/GeneralStatistic";
import change_password from "./display/ChangePassword";
import profile from "./display/Profile";
import contact_User from "./display/Contact";


const sidebar = [
    {
        path: "/app/dashboard",
        access: ["ownerAccess"],
        name: "Dashboard",
        Component: DashboardContain,
        icon: Dashboard,
        display: dashboard
    },
    {
        path: "/app/category",
        access: ["ownerAccess"],
        name: "Manage Categories",
        Component: ManageCategoryContain,
        icon: Category,
        display: manage_category
    },
    {
        path: "/app/food",
        access: ["ownerAccess"],
        name: "Manage Foods",
        Component: ManageFoodContain,
        icon: Food,
        display: manage_food
    },
    {
        path: "/app/orders",
        access: ["ownerAccess"],
        name: "Manage Orders",
        Component: ManageOrderContain,
        icon: Order,
        display: manage_order
    },
    {
        path: "/app/soldout",
        access: ["ownerAccess"],
        name: "Manage Soldout Product",
        Component: ManageSoldoutContain,
        icon: Soldout,
        display: manage_soldout
    },
    {
        path: "/app/report",
        access: ["ownerAccess"],
        name: "Report",
        Component: GeneralStatisticContain,
        icon: Report,
        display: general_statistic
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
    },

    {
        path: "/app/orders/:order_id",
        access: ["ownerAccess"],
        name: "Manage Orders Detail",
        Component: ManageOrderDetailContain,
        display: manage_order
    },

    {
        path: "/shop/:id",
        access: ["guestAccess", "peopleAccess"],
        Component: ShopDetailContain
    },
    {
        path: "/shop",
        access: ["guestAccess", "peopleAccess"],
        Component: ShopContain
    },
    {
        path: "/cart",
        access: ["guestAccess", "peopleAccess"],
        Component: CartContain
    },
    {
        path: "/blog",
        access: ["guestAccess", "peopleAccess"],
        Component: Blog
    },
    {
        path: "/account",
        access: ["guestAccess", "peopleAccess"],
        Component: Account
    },
    {
        path: "/checkout",
        access: ["guestAccess", "peopleAccess"],
        Component: CheckoutContain
    },
    {
        path: "/portfolio",
        access: ["guestAccess", "peopleAccess"],
        Component: Portfolio
    },
    {
        path: "/",
        access: ["guestAccess", "peopleAccess"],
        Component: HomePage
    }
]

export {sidebar};

export default [...routes, ...sidebar ];
