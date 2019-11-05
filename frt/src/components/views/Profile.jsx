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
import CardAvatar from "components/Card/CardAvatar.jsx";
import moment from "moment";

const Profile = ({form, hd, profile, people, confirm, withAccess, ...props}) =>  (
    <AppLayoutContain {...props}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <TitleBox {...form.box} />
            </GridItem>

            <GridItem xs={12} sm={12} md={8}>
                <Card customCss="custom-card">
                    <CustomCardHeader
                        title="Edit Profile"
                        subtitle="Complete your profile"
                    />
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <FormInput
                                    type="text"
                                    label="View name"
                                    placeholder="Enter your view name"
                                    required
                                    name="viewname"
                                    value={profile.viewname}
                                    onChange={hd.profileChange}
                                />
                            </GridItem>
                            {
                                withAccess(["peopleAccess"]) && <GridItem xs={12} sm={12} md={5}>
                                    <FormInput
                                        type="email"
                                        label="Email"
                                        placeholder="Enter your email"
                                        required
                                        name="email"
                                        value={profile.email}
                                        onChange={hd.profileChange}
                                    />
                                </GridItem>
                            }
                            <GridItem xs={12} sm={12} md={4}>
                                <FormInput
                                    type="number"
                                    label="Phone"
                                    placeholder="Enter your phone"
                                    required
                                    name="phone"
                                    value={profile.phone}
                                    onChange={hd.profileChange}
                                />
                            </GridItem>
                        </GridContainer>
                        {
                            withAccess(["peopleAccess"]) && <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <FormInput
                                        type="text"
                                        label="Job"
                                        placeholder="Enter your Job"
                                        required
                                        name="job"
                                        value={people.job}
                                        onChange={hd.peopleChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <FormInput
                                        type="date"
                                        label="Birthdate"
                                        required
                                        name="birthDate"
                                        value={people.birthDate}
                                        onChange={hd.birthDay}
                                    />
                                </GridItem>
                            </GridContainer>
                        }
                    </CardBody>
                </Card>
                {
                    confirm && <ConfirmBar confirm={hd.confirm}/>
                }
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                    <CardAvatar profile>
                        <a href="_blank" className="#pablo">
                            <img src={profile.avatar.link} alt="." />
                        </a>
                    </CardAvatar>
                    <CardBody profile>
                        <h4>{profile.viewname}</h4>
                        <p>Email: <i>{profile.email}</i></p>
                        <p>Phone: <span>0{profile.phone}</span></p>
                        {
                            withAccess(["peopleAccess"]) && <div>
                                <p>Job: <span>{people.job}</span></p>
                                <p>Birthdate: <span>{moment(people.birthDate).format("DD-MM-YYYY")}</span></p>
                                <p>Age: <span>{people.birthDate ? moment().diff(people.birthDate, "years") : 0} years old</span></p>
                            </div>
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    </AppLayoutContain>
)

export default Profile;
