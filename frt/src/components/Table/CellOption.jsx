import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const OptTips = ({text, ...props}) => (
    <Tooltip
        id="tooltip-top"
        title={text}
        placement="top"
    >
        {props.children}
    </Tooltip>
)

const CellOption = ({options, use}) => (
    <div>
        {
            options.more && options.more.map((o, i) => (
                <OptTips key={i} text={o.name}>
                    <i
                        className={`${o.icon} ${o.className ? o.className : ""}`}
                        onClick={o.fn ? o.fn.bind(this, use) : null}
                    />
                </OptTips>
            ))
        }
        {
            options.remove && <OptTips text="Remove">
                <i
                    className="fas fa-times remove"
                    onClick={options.remove.bind(this, use)}
                />
            </OptTips>
        }
        {
            options.edit && <OptTips text="Edit">
                <i
                    className="fas fa-edit edit"
                    onClick={options.edit.bind(this, use)}
                />
            </OptTips>
        }
    </div>
)

export {OptTips};

export default CellOption;
