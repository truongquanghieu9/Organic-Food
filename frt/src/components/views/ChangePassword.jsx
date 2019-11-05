import React from "react";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ConfirmBar from "components/Bar/ConfirmBar";
import CustomCardHeader from "components/Card/CustomCardHeader";
import FormInput from "components/CustomInput/FormInput";
import TitleBox from "components/Box/TitleBox";

const ChangePassword = ({hd, form, users, confirm, ...props}) => (
    <AppLayoutContain {...props}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <TitleBox {...form.box} />
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
                <Card customCss="custom-card">
                    <CustomCardHeader
                        title="Change Password"
                        subtitle="Please fill in suitable information for your password"
                    />
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={6} sm={12} md={12}>
                                <FormInput
                                    type="password"
                                    label="Old Password"
                                    required
                                    name="password"
                                    value={users.password}
                                    onChange={hd.change}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} sm={12} md={6}>
                                <FormInput
                                    type="password"
                                    label="New Password"
                                    required
                                    name="newPassword"
                                    value={users.newPassword}
                                    onChange={hd.change}
                                />
                            </GridItem>
                            <GridItem xs={6} sm={12} md={6}>
                                <FormInput
                                    type="password"
                                    label="Confirm Password"
                                    required
                                    name="confirmPassword"
                                    value={users.confirmPassword}
                                    onChange={hd.change}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
                {
                    confirm && <ConfirmBar confirm={hd.confirm}/>
                }
            </GridItem>
        </GridContainer>
    </AppLayoutContain>
);

export default ChangePassword;
