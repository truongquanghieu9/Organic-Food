import React, { Fragment } from 'react';

import HeaderNewContainer from 'contains/Layout/HeaderContainer';
import Footer from 'components/Shop/Footer';

const ShopLayout = ({...props}) => (
    <Fragment>
        <HeaderNewContainer  />
            <div>
                {props.children}
            </div>
        <Footer />
    </Fragment>
);

export default ShopLayout;
