import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import FormInput from "components/CustomInput/FormInput";
import CustomCardHeader from "components/Card/CustomCardHeader";

const RoomForm = ({classes, ...props}) => (
    <Card>
        <CustomCardHeader/>
        <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <FormInput />
                </GridItem>
            </GridContainer>
        </CardBody>
        <CardFooter />
    </Card>
)

export default RoomForm;
