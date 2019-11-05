import React from "react";
import AuthLayoutContain from "contains/Layout/AuthLayout.jsx";
import withAuth from "hocs/withAuth";
import AuthInput from "components/CustomInput/AuthInput.jsx";
import {Link} from "react-router-dom";

const Login = ({hdSubmit, hdChange, button, input, ...props}) => (
    <AuthLayoutContain {...props}>
        <div className="inner">
            <div className="inForm">
                <form className="authForm" onSubmit={hdSubmit}>
                { input.map((v, i) => ( <AuthInput key={i} {...v} send={hdChange} /> )) }
                <button className={button.cssClass}>{button.text}</button>
                </form>

            </div>
            <Link to="/reset">Forgot your password?</Link>
        </div>
    </AuthLayoutContain>
)

export default withAuth(Login);
