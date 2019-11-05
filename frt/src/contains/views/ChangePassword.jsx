import React, {useState, useEffect} from "react";
import ChangePassword from "components/views/ChangePassword";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

const DEFAULT_PASSWORD = {
    password: "",
    newPassword: "",
    confirmPassword: ""
}

function ChangePasswordContain({api, user, notify, ...props}) {
    const [users, setUsers] = useState(DEFAULT_PASSWORD);
    const [confirm, setConfirm] = useState(false);

    const hdChange = (e) => {
        setConfirm(true);
        const {name, value} = e.target;
        setUsers(prev => ({...prev, [name]: value}));
    }

    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function load() {
        try {
            setUsers(DEFAULT_PASSWORD);
            setConfirm(false);
        } catch(err) {
            notify();
        }
    }

    async function hdConfirm() {
        try {
            if(users.password && users.newPassword && users.confirmPassword){
                let {newPassword, confirmPassword} = users;
                if(newPassword === confirmPassword){
                    await apiCall("put", api.updatePassword(user._id), users);
                    await load();
                    notify("Change password successfully!", true);
                } else {
                    notify("Password not the same or old password is valid !", false);
                }
            } else {
                notify("Please complete your password!", false);
            }
        } catch(err) {
            console.log(err);
            return notify(err);
        }
    }

    return <ChangePassword
        {...props}
        users={users}
        hd={{
            confirm: hdConfirm,
            change: hdChange
        }}
        confirm={confirm}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ChangePasswordContain));
