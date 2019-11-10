import React, {Component} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import image from "assets/img/sidebar-4.jpg";
import PropTypes from "prop-types";

import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import AppRoutes from "views/App";

// custom import
import {connect} from "react-redux";
import {getAccess} from "services/credentialVerify";
import {sidebar} from "contents/index";

import logo from "assets/img/reactlogo.png";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

let ps;

class AppLayout extends Component {
    state = {
        image: image,
        color: "blue",
        hasImage: true,
        fixedClasses: "dropdown show",
        mobileOpen: false
    };

    mainPanel = React.createRef();

    handleImageClick = image => {
        this.setState({ image: image });
    };

    handleColorClick = color => {
        this.setState({ color: color });
    };

    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({ fixedClasses: "dropdown show" });
        } else {
            this.setState({ fixedClasses: "dropdown" });
        }
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.mainPanel.current);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.mainPanel.current.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
        window.removeEventListener("resize", this.resizeFunction);
    }

    verifyNavItem = () => {
        const {isPermit} = this.props;
        return sidebar.filter(v => isPermit(v.access));
    }

    render() {
        const {classes, ...props} = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={this.verifyNavItem()}
                    logoText={"Organic Food"}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...props}
                />
                <div className={classes.mainPanel} ref={this.mainPanel}>
                    <Navbar
                        routes={this.verifyNavItem()}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...props}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <AppRoutes/>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

AppLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapState({user}) {
    return {
        isPermit: getAccess(user.data.role)
    }
}

export default connect(mapState, null)(withStyles(dashboardStyle)(AppLayout));
