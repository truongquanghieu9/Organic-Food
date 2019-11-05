import React from "react";

const CustomCardHeader = ({title, subtitle}) => (
    <div className="custom-header">
        <h5>{title}</h5>
        <p>{subtitle}</p>
    </div>
)

export default CustomCardHeader;
