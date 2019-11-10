import React, {useState, useEffect} from "react";
import Contact from "components/views/Contact";
import {apiCall} from "services/apiCall";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

const DEFAULT_MAIL = {
    user_id: [],
    title: "",
    content: "",
}

function ContactContain({api, user, notify, ...props}) {
    const [userList, setUserList] = useState([]);
    const [mail, setMail] = useState(DEFAULT_MAIL);
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hdChange = (e) => {
        const {name, value} = e.target;
        setMail(prev => ({...prev, [name]: value}));
    }

    async function load() {
        try {
            let userData = await apiCall("get", api.user.get());
            // console.log(userData);
            userData = userData.map(us => ({...us, select: false}));
            setUserList(userData);
            setConfirm(false);
            setMail(DEFAULT_MAIL);
        } catch(err) {
            notify();
        }
    }

    async function hdConfirm() {
        try {
            if(mail.title !== "" && mail.content !== "") {
                await apiCall("post", api.user.post(user._id), mail);
                await load();

                notify("Your contact ware sent successfully!", true);
            } else {
                notify("Please fill in contact information!", false);
            }
        } catch(err) {
            console.log(err);
            return notify(err);
        }
    }

    function selectUser(u_id) {
        if(mail.user_id.indexOf(u_id) !==-1) {
            let mail_place = mail.user_id.indexOf(u_id);
            mail.user_id.splice(mail_place, 1);
            let modUser_id = [...userList, u_id];
            let modUser = userList.filter(p => p._id !== u_id);

            setMail(prev => ({...prev, user_id: modUser_id}));
            setUserList(modUser);

            // console.log(modUser_id[modUser_id.length-1]);
            // console.log(user_place);
            // console.log(modUser_id);
            // console.log(modUser);
            // console.log(u_id);
            // console.log(userList);

        } else {
            setConfirm(true);
            return setMail(prev => ({
                ...prev,
                user_id: [...prev.user_id, u_id]
            }));
        }
    }

    return <Contact
        {...props}
        confirm={confirm}
        userList={userList}
        mail={mail}
        selectUser={selectUser}
        hd={{
            change: hdChange,
            confirm: hdConfirm
        }}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ContactContain));
