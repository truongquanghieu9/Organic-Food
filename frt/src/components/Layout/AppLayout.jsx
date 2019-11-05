import React from "react";
import PropTypes from "prop-types";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import logo from "assets/img/reactlogo.png";

const AppLayout = ({classes, st, hdDrawerToggle, mainPanel, verifyNavItem, ...rest}) => {
    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={verifyNavItem()}
                logoText={"Organic Food"}
                logo={logo}
                image={st.image}
                handleDrawerToggle={hdDrawerToggle}
                open={st.mobileOpen}
                color={st.color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={verifyNavItem()}
                    handleDrawerToggle={hdDrawerToggle}
                    {...rest}
                />
                <div className={classes.content}>
                    <div className={classes.container}>{rest.children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

AppLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AppLayout);
