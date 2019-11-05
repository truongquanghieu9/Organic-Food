import React from "react";

const PeopleBox = ({link, remove, add, job, name, ...props}) => (
    <div className="people-box">
        <div>
            <img src={link} alt=""/>
            {remove && <button className="remove" onClick={remove}><i className="fas fa-minus"></i></button>}
            {add && <button className="add" onClick={add}><i className="fas fa-plus"></i></button>}
        </div>
        <div>
            <p>{name}</p>
            <small>{job ? job : "Unknown"}</small>
        </div>
    </div>
)

export default PeopleBox;
