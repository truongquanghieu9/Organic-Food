import React, {useEffect} from "react";
import Activate from "components/views/Activate";
import {apiCall} from "services/apiCall";
import {activateUser} from "store/actions/user";
import {connect} from "react-redux";

function ActivatedContain({api, ...props}) {

    useEffect(() => {
        let checkActive = false
        if(!checkActive) verify();
        return () => checkActive = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function verify() {
        const {user_id} = props.match.params;
        try {
            let user = await apiCall("get", api.getOne(user_id));
            if(!user.active) {
                let newUser = await apiCall("put", api.activate(user_id));
                await props.activateUser(newUser.user._id);
                console.log("run");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return <Activate {...props} />
}

export default connect(null, {activateUser})(ActivatedContain);
