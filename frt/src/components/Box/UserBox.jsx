import React, {useState, useEffect} from "react";

const UserCheckbox = ({select, avatar, viewname, email, choose, shouldDisable, ...props}) => {
    const [disable, setDisable] = useState(-1);

    useEffect(() => {
        if(disable === -1) {
            setDisable(shouldDisable ? 1 : 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldDisable]);

    return (
        <div className={`price-box ${select ? "select" : ""} ${disable === 1 ? "disable" : ""}`} onClick={disable === 1 ? null : choose}>
            <div>
                <i className={avatar.link}></i>
                <div>
                    <p>{viewname}</p>
                    <small>{email}</small>
                </div>
            </div>
            {(disable === 0 && !select) && <i className="fas fa-circle-notch"></i>}
            {select && <i className="fas fa-check-circle"></i>}
        </div>
    )
}

export default UserCheckbox;
