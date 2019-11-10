import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";

import Home from "views/Shop/HomePage";

function ShopRoutes({match, location, ...props}) {
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={Home}/>
        </Switch>
    )
}

export default withRouter(ShopRoutes);
