import React from "react";
import {connect} from "react-redux";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import routes from "contents/index";
import {getAccess, getDirectPath} from "services/credentialVerify";

const Routes = ({verifyRoute, directPath, ...props}) => {
    let accessRoutes = routes.filter(v => verifyRoute(v.access));
    return (
        <Switch>
            {
                accessRoutes.map((r, i) => {
                    const {Component, display} = r;
                    return (
                        <Route path={r.path} key={i}
                            render={props => (<Component {...display} {...props}/>)}
                        />
                    )
                })
            }
            <Redirect exact from={props.location.pathname} to={directPath}/>
        </Switch>
    )
}

function mapState({user}) {
    return {
        verifyRoute: getAccess(user.data.role),
        directPath: getDirectPath(user.data.role)
    }
}

export default connect(mapState)(withRouter(Routes));
