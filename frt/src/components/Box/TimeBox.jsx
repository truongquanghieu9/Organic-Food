import React from "react";
import moment from "moment";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

const TimeBox = ({date, invoice, canInvoice, inwork, ...props}) => {

    function style() {
        let css = "timeBox";
        if(canInvoice) css += " invoice";
        return inwork ? `${css} inwork` : css;
    }

    return (
        <Card>
            <CardBody>
                <div className={style()}>
                    <div>
                        <i className="far fa-calendar-alt"></i>
                        <div>
                            <p><b>{moment(date).format("dddd Do MMM, YYYY")}</b></p>
                            <p>End of month</p>
                        </div>
                    </div>
                    {
                        canInvoice && inwork && <span id="working">
                            <span>Working...</span>
                        </span>
                    }
                    {
                        (canInvoice && !inwork) && <span onClick={invoice}>
                            <i className="fas fa-plus"></i>
                            <span>Invoice</span>
                        </span>
                    }
                    {
                        (!canInvoice) && <span>
                            <span>wait</span>
                        </span>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

const Timeline = ({time, idCheck, ...props}) => {

    function canInvoice(date) {
        let dates = time.map(v => moment(v.date));
        let upcomingDate = moment.min(dates);
        return upcomingDate.isSame(date);
    }

    return time.map((v, i) => (
        <TimeBox
            {...props}
            {...v}
            canInvoice={canInvoice(v.date)}
            inwork={idCheck !== undefined && idCheck === v._id}
            key={i}
        />
    ))
}

export default Timeline;
