import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import styles from "assets/cardHeaderStyle";

const TableCard = ({classes, title, subtitle, color, ...props}) => (
    <Card>
        <CardHeader color={color ? color : "primary"}>
            <h4 className={classes.cardTitleWhite}>{title}</h4>
            <p className={classes.cardCategoryWhite}>{subtitle}</p>
        </CardHeader>
        <CardBody>
            {props.children}
        </CardBody>
    </Card>
)

export default withStyles(styles)(TableCard);
