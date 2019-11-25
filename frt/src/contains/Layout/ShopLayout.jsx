import React, { Component, Fragment } from 'react';

import HeaderNewContainer from 'contains/Layout/HeaderContainer';
import Footer from 'components/Shop/Footer';

// class ShopLayout extends Component {
//     render() {
//         const {header} = this.props;
//         return (
//             <Fragment>
//                 <HeaderNewContainer {...header} />
//                 <div>
//                     {this.props.children}
//                 </div>
//                 <Footer />
//             </Fragment>
//         );
//     }
// }

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
