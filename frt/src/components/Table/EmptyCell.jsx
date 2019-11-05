import React from "react";

const EmptyCell = ({text}) => (
    <span className="empty-cell">{text ? text : "Not yet"}</span>
)

export default EmptyCell;
