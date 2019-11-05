import React, {useState} from "react";

export default function AuthInput({icon, type, send, ...props}){
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => setFocus(prev => !prev);
    return (
        <div className="authInput">
            <i className={`${icon} ${focus ? "focus" : ""}`}></i>
            <input
                type={type ? type : "text"}
                className={`auth-input ${focus ? "focus" : ""}`}
                onChange={send}
                onFocus={toggleFocus}
                onBlur={toggleFocus}
                {...props}
            />
        </div>
    );
}
