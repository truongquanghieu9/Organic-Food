import React, { Fragment } from 'react';

import HeaderContainer from 'contains/Layout/HeaderContainer';
import Footer from 'components/Shop/Footer';

import {connect} from "react-redux";
import {getAccess} from "services/credentialVerify";
// import { actFetchProductsRequest } from 'store/actions/shop';

const ShopLayout = ({...props}) => (
    
    <Fragment>
        <HeaderContainer/>
            <div>
                {props.children}
            </div>
        <Footer />
    </Fragment>
);

// class ShopLayout extends Component {
//     componentDidMount() {
//         this.props.handleFetchProductsRequest();
//         console.log("run");
//     }

//     render() {
//         return (
//             <Fragment>
//                 <HeaderContainer/>
//                     <div>
//                         {this.props.children}
//                     </div>
//                 <Footer />
//             </Fragment>
//         )
//     }
// }

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         handleFetchProductsRequest: () => {
//             dispatch(actFetchProductsRequest());
//         }
//     }
// }

function mapState({user}) {
    return {
        isPermit: getAccess(user.data.role)
    }
}

export default connect(mapState, null)(ShopLayout);
