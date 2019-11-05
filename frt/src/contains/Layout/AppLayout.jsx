import React, {Component} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import AppLayout from "components/Layout/AppLayout";
import image from "assets/img/sidebar-4.jpg";

// custom import
import {connect} from "react-redux";
import {getAccess} from "services/credentialVerify";
import {sidebar} from "contents/index";

let ps;

class AppLayoutContain extends Component {
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
        return <AppLayout
            st={this.state}
            {...this.props}
            hdDrawerToggle={this.handleDrawerToggle}
            mainPanel={this.mainPanel}
            verifyNavItem= {this.verifyNavItem}
        />
    }
}

function mapState({user}) {
    return {
        isPermit: getAccess(user.data.role)
    }
}

export default connect(mapState, null)(AppLayoutContain);
