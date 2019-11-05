import React from "react";

const ASBar = ({create, search, hdChange, ...props}) => (
    <div className="as-bar">
        <div>
            {create && <button onClick={create} id="add"><i className="fas fa-plus"></i></button>}
            <button id="remove"><i className="fas fa-trash"></i></button>
            <p><i className="fas fa-table"></i> <span>Showing 10 entries</span></p>
        </div>
        <div>
            <p>Search:</p>
            <div>
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Enter the room name here to search"
                    value={search}
                    onChange={hdChange}
                />
            </div>
        </div>
    </div>
)

export default ASBar;
