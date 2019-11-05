import React from "react";

const EmptyBox = ({message, height}) => (
    <div className="empty-box" style={{height}}>
        <p>{message}</p>
    </div>
)

export default EmptyBox;
