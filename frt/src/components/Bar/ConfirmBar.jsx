import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

const ConfirmBar = ({confirm, load, cancel}) => (
    <Card customCss="custom-card">
        <CardBody>
            <div className="confirm-bar">
                <div>
                    {load || <button onClick={confirm}><i className="fas fa-check"></i>Confirm</button>}
                    {load && <button><i className="fas fa-circle-notch fa-spin"></i></button>}
                    {cancel && <button onClick={cancel}>Cancel</button>}
                </div>
                <p>Enter information and select "Confirm" to complete{cancel ? ` or "Cancel" to exit` : "."}</p>
            </div>
        </CardBody>
    </Card>
)

export default ConfirmBar;
