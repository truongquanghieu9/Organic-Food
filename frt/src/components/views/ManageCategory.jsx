import React from "react";
import PropTypes from "prop-types";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CategoryTable from "components/Table/CategoryTable.jsx";
import ConfirmBar from "components/Bar/ConfirmBar";
import CustomCardHeader from "components/Card/CustomCardHeader";
import FormInput from "components/CustomInput/FormInput";
import ASBar from "contains/Bar/ASBar";
import EmptyBox from "components/Box/EmptyBox";
import TableCard from "components/Card/TableCard";
import TitleBox from "components/Box/TitleBox";

import withStyles from "@material-ui/core/styles/withStyles";
import styles from "assets/cardHeaderStyle";

const ManageCategory = ({classes, formIsOpen, toggleForm, hd, form, category, categories, setCategories, table, ...props}) => (
    <AppLayoutContain {...props}>
    {
        formIsOpen && <GridContainer>
             <GridItem xs={12} sm={12} md={12}>
                <TitleBox {...form.box} />
                <ConfirmBar cancel={toggleForm} confirm={hd.confirm}/>
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
                <Card customCss="custom-card">
                    <CustomCardHeader
                        title="New Category Information"
                        subtitle="Please fill in suitable information for your category"
                    />
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={6} sm={12} md={12}>
                                <FormInput
                                    type="text"
                                    label="Category name"
                                    placeholder="Enter the category's tags name"
                                    required
                                    name="name"
                                    value={category.name}
                                    onChange={hd.change}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={7}>
                <Card customCss="custom-card">
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={6} sm={12} md={12}>
                                <FormInput
                                    type="text"
                                    label="Category description"
                                    placeholder="Enter the category's description"
                                    area={{
                                        cols: 1,
                                        rows: 5
                                    }}
                                    name="desc"
                                    value={category.desc}
                                    onChange={hd.change}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    }

    {
        formIsOpen || <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <TableCard {...table.category.card}>
                    <ASBar
                        create={toggleForm}
                        keys={["name", "desc"]}
                        data={categories}
                        setData={setCategories}
                    />
                    {
                        categories.length > 0
                        ? <CategoryTable
                            tableHeaderColor="primary"
                            tableHead={table.category.header}
                            tableData={categories}
                            options={{
                                    remove: hd.remove,
                                    edit: hd.edit
                                }}
                            />
                        : <EmptyBox message={table.category.empty}/>
                    }
                </TableCard>
            </GridItem>
        </GridContainer>
    }

    </AppLayoutContain>
);

ManageCategory.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(ManageCategory);
