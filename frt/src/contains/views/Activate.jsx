import React from "react";
import Activate from "components/views/Activate";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

function ActivateContain({isAuth, ...props}) {
    const {pathname} = props.location;
    return isAuth ? <Activate {...props} /> : <Redirect from={pathname} to="/login"/>
}

function mapState({user}) {
    return {
        isAuth: user.isAuthenticated
    }
}

export default connect(mapState, null)(ActivateContain);
