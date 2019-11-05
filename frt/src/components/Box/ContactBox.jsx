import React from "react";

const UserCheckbox = ({select, avatar, viewname, email, choose, ...props}) => {

    return (
        <div className="contact-box">
            <div>
                <img className={select ? "select" : ""} src={avatar.link} alt="" />
                {select && <button className="remove" onClick={choose}><i className="fas fa-check"></i></button>}
                {!select && <button className="add" onClick={choose}><i></i></button>}
            </div>
            <div>
                <p>{viewname}</p>
            </div>
        </div>
    )
}

export default UserCheckbox;
