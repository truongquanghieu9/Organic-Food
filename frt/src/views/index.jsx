import React from "react";
import {Switch, Route} from "react-router-dom";

import ShopLayout from "contains/Layout/ShopLayout";
import AppLayout from "contains/Layout/NewAppLayout";
// import AuthLayout from "contains/Layout/AuthLayout";

function RootRoutes() {
    return (
        <Switch>
            <Route path="/app" component={AppLayout}/>
            {/* <Route path="/auth" component={AuthLayout}/> */}
            <Route path="/" component={ShopLayout}/>
        </Switch>
    )
}

export default RootRoutes;
