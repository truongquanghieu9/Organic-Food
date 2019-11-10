import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";

import Test from "views/App/Test";
import ManageFood from "views/App/ManageFood";

function AppRoutes({match, location, ...props}) {
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={ManageFood}/>
        </Switch>
    )
}

export default withRouter(AppRoutes);
