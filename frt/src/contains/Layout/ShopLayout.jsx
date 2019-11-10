import React, { Fragment } from 'react';

import HeaderCartContainer from 'contains/HeaderCartContainer';
import Footer from 'components/Footer';

import ShopRoutes from "views/Shop";

function ShopLayout() {
    return (
        <Fragment>

            <HeaderCartContainer />

            <ShopRoutes/>

            <Footer />

        </Fragment>
    );
}

export default ShopLayout;