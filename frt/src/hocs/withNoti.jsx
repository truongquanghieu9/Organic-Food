import React, {useState, useEffect} from "react";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";

const DEFAULT_MSG = "Oops, there is something wrong with the process. Please try again.";

export default function withNoti(WrappedComponent){
    function Notification({...props}) {
        const [notice, setNotice] = useState({
            open: false,
            color: "danger",
            message: ""
        });

        useEffect(() => {
            if(notice.open) {
                setTimeout(function() {
                    setNotice(prev => ({...prev, open: false}));
                }, 5000);
            };
        }, [notice.open]);

        function toggleNotice(message=DEFAULT_MSG, success=false, open=true) {
            if(!open) return setNotice(prev => ({...prev, open}))
            return setNotice({
                open, message,
                color: success ? "success" : "danger"
            });
        }

        return (
            <div>
                <Snackbar
                    {...notice}
                    icon={AddAlert}
                    place="tc"
                    closeNotification={toggleNotice.bind(this, "", false, false)}
                    close
                />
                <WrappedComponent {...props} notify={toggleNotice}/>
            </div>
        )
    }

    return Notification;
}
