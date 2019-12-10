import React from "react";
import {connect} from "react-redux";
import {authSocial} from "store/actions/user";

export default function withSocial(WrappedComponent) {
    function Authentication({authSocial, user, ...props}) {

        async function hdSuccess(response) {
            try {
                // Get data from google authenticate
                const {email, familyName, givenName, imageUrl} = response.profileObj;
                let user = {
                    email,
                    viewname: familyName + " " + givenName,
                    avatar: {
                        link: imageUrl
                    }
                }
                let api = "/api/user/social";
                authSocial(api, user);
            } catch (e) {
                console.log(e);
            }
        }
    
        function hdFailure(response) {
            console.log(response);
        }

        return <WrappedComponent
            {...props}
            hdSuccess={hdSuccess}
            hdFailure={hdFailure}
        />
    }

    return connect(null, {authSocial})(Authentication);
}
