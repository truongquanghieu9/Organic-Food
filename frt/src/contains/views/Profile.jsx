import React, {useState, useEffect} from "react";
import Profile from "components/views/Profile";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import moment from "moment";
import withNoti from "hocs/withNoti";
import {getAccess} from "services/credentialVerify";

const DEFAULT_PROFILE = {
    viewname: "",
    email: "",
    phone: 0,
    avatar: {
        link: ""
    }
}

const DEFFAULT_PEOPLE = {
    birthDate: moment().format("YYYY-MM-DD"),
    job: ""
}

function ProfileContain({api, user, notify, ...props}) {
    const [people, setPeople] = useState(DEFFAULT_PEOPLE);
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hdProfileChange = (e) => {
        setConfirm(true);
        const {name, value} = e.target;
        setProfile(prev => ({...prev, [name]: value}));
    }

    const hdPeopleChange = (e) => {
        setConfirm(true);
        const {name, value} = e.target;
        setPeople(prev => ({...prev, [name]: value}));
    }

    const hdBirthday = (e) => {
        setConfirm(true);
        const {value} = e.target;
        setPeople(prev => ({
            ...prev,
            birthDate: moment(value).format("YYYY-MM-DD")
        }));
    }

    async function hdConfirm() {
        try {
            if(profile.viewname && profile.email && profile.phone) {
                await apiCall("put", api.user.update(user._id), profile);
                if(props.withAccess(["peopleAccess"])) {
                    await apiCall("put", api.people.update(user._id, people._id), people);
                }
                await load();
                setConfirm(false);
                notify("Update profile successfully!", true);
            } else {
                notify("Please complete your profile!", false);
            }
        } catch(err) {
            notify();
        }
    }

    async function load() {
        try {
            let profileData = await apiCall("get", api.user.getOne(user._id));
            setProfile({
                ...profileData,
                phone: profileData.phone ? profileData.phone - 0 : 0
            });
            if(props.withAccess(["peopleAccess"])) {
                let peopleData = await apiCall("get", api.people.getOne(user._id, profileData.people_id));
                setPeople(prev => ({
                    ...prev,
                    ...peopleData,
                    birthDate: moment(peopleData.birthDate).format("YYYY-MM-DD")
                }));
            }
        } catch(err) {
            notify();
        }
    }

    return <Profile
        {...props}
        profile={profile}
        people={people}
        hd={{
            profileChange: hdProfileChange,
            peopleChange: hdPeopleChange,
            birthDay: hdBirthday,
            confirm: hdConfirm
        }}
        confirm={confirm}
    />
}

function mapState({user}) {
    return {
        user: user.data,
        withAccess: getAccess(user.data.role)
    }
}

export default connect(mapState, null)(withNoti(ProfileContain));
