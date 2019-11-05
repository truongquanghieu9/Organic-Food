import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import styles from "assets/cardHeaderStyle";

const TitleBox = ({title, subtitle, classes, color, ...props}) => (
    <Card plain>
        <CardHeader plain color={color ? color : "primary"}>
            <h4 className={classes.cardTitleWhite}>{title}</h4>
            <p className={classes.cardCategoryWhite}>{subtitle}</p>
        </CardHeader>
    </Card>
)

export default withStyles(styles)(TitleBox);
