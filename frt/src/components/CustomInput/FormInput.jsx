import React from "react";

const FormInput = ({label, area, required, ...props}) => (
    <div className="form-input">
        <label>{`${label} ${required ? "(*)": ""}`}</label>
        {
            area
            ? <textarea cols={area.cols} rows={area.rows} {...props}></textarea>
            : <input {...props}/>
        }
    </div>
)

export default FormInput;
