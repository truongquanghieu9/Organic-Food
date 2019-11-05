import React, {useState} from "react";
import ConfirmBar from "components/Bar/ConfirmBar";

function ConfirmBarContain({confirm, ...props}) {

    const [load, setLoad] = useState(false);

    const toggle = () => setLoad(prev => !prev);

    async function doConfirm() {
        toggle();
        await confirm();
        toggle();
    }

    return <ConfirmBar
        {...props}
        load={load}
        toggle={toggle}
        confirm={doConfirm}
    />;
}

export default ConfirmBarContain;
