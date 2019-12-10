import React from "react";
import GoogleLogin from "react-google-login";
import withSocial from "hocs/withSocial";

const SocialBtn = ({hdSuccess, hdFailure, ...props}) => (
    <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY}
        render={renderProps => (
            <li className="google-plus" 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <a href="#1" target="_blank"><i className="fab fa-google-plus-g" />Google+</a>
            </li>
        )}
        onSuccess={hdSuccess}
        onFailure={hdFailure}
    />
)

export default withSocial(SocialBtn);