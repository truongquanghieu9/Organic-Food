import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {authUser} from "store/actions/user";

export default function withAuth(WrappedComponent) {
    function Authentication({api, authUser, user, ...props}) {
        const [state, setState] = useState({});

        useEffect(() => {
            if(user.isAuthenticated) return props.history.push("/activate");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user.isAuthenticated])

        const hdChange = e => {
            const {name, value} = e.target;
            setState(prev => ({ ...prev, [name]: value }));
        }

        const hdSubmit = async(e) => {
            e.preventDefault();
            await authUser(api, state);
        }

        return <WrappedComponent
            {...props}
            hdChange={hdChange}
            hdSubmit={hdSubmit}
        />
    }

    function mapState({user}) {
        return {
            user
        }
    }

    return connect(mapState, {authUser})(Authentication);
}
