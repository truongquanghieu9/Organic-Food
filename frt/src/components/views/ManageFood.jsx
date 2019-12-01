import React from "react";
import PropTypes from "prop-types";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FoodTable from "components/Table/FoodTable.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PriceBox from "components/Box/PriceBox";
import CustomCardHeader from "components/Card/CustomCardHeader";
import FormInput from "components/CustomInput/FormInput";
import ConfirmBar from "contains/Bar/ConfirmBar";
import ASBar from "contains/Bar/ASBar";
import TableCard from "components/Card/TableCard";
import TitleBox from "components/Box/TitleBox";
import EmptyBox from "components/Box/EmptyBox";

import {
    Row,
    Col
} from "react-bootstrap";
import Browse from "components/Uploader/Browse";
import ListImage from "components/Uploader/ListImage";
import NoImg from "components/Uploader/ColUploadBox";
import Uploader from "components/Uploader/Uploader";

const ManageFood = ({formIsOpen, toggleForm, hd, form, food, foods, table, category, selectCategory, setFoods, image, removeImage, getImage, ...props}) => (

    <AppLayoutContain {...props}>
        {
            formIsOpen && <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TitleBox {...form.box} />
                    <ConfirmBar cancel={toggleForm} confirm={hd.confirm}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <Card customCss="custom-card">
                        <CustomCardHeader {...form.info}/>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={8}>
                                    <FormInput
                                        type="text"
                                        label="Food Name"
                                        placeholder="Food Name"
                                        name="name"
                                        value={food.name}
                                        onChange={hd.change}
                                        required
                                    />
                                    <FormInput
                                        type="number"
                                        label="Rating"
                                        placeholder="Rating 1-5"
                                        name="star"
                                        value={food.star}
                                        onChange={hd.change}
                                        required
                                    />
                                    <FormInput
                                        type="text"
                                        label="Description"
                                        placeholder="Enter some description here..."
                                        area={{
                                            cols: 1,
                                            rows: 4
                                        }}
                                        name="desc"
                                        value={food.desc}
                                        onChange={hd.change}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <FormInput
                                        type="number"
                                        label="Quantity"
                                        placeholder="Quantity"
                                        name="quantity"
                                        value={food.quantity}
                                        onChange={hd.change}
                                        required
                                    />
                                    <FormInput
                                        type="number"
                                        label="Price"
                                        placeholder="Price"
                                        name="price"
                                        value={food.price}
                                        onChange={hd.change}
                                        required
                                    />
                                    <FormInput
                                        type="number"
                                        label="Discount"
                                        placeholder="Discount"
                                        name="discount"
                                        value={food.discount}
                                        onChange={hd.change}
                                        required
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                    <Card customCss="custom-card">
                        <CustomCardHeader
                            title="Select Category"
                            subtitle="This will be used in food type"
                        />
                        <CardBody>
                            <GridContainer customCss="price-container">
                                {
                                    category.length > 0
                                    ? category.map((pr, i) => (
                                        <GridItem xs={12} sm={6} md={3} key={i}>
                                            <PriceBox
                                                {...pr}
                                                select={pr._id === food.category_id}
                                                choose={selectCategory.bind(this, pr._id)}
                                            />
                                        </GridItem>
                                    ))
                                    : <GridItem xs={12} sm={12} md={12}>
                                        <EmptyBox
                                            height="100%"
                                            message="There is no category to select"
                                        />
                                    </GridItem>
                                }
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                    <Card customCss="custom-card">
                        <CustomCardHeader {...form.image}/>
                        <CardBody>
                            <Row className="clearfix">
                                <Col sm={12}>
                                    <Uploader
                                        accept={['image/*']}
                                        remove={removeImage}
                                        get={getImage}
                                    >
                                        {
                                            image.length > 0
                                            ? <div>
                                                <ListImage images={image} upImage={food.image_id}/>
                                                <div className="uploadBtn">
                                                    <Browse/>
                                                </div>
                                            </div>
                                            : <NoImg file="image" icon="fas fa-file-image"/>
                                        }
                                    </Uploader>
                                    <button className="btn btn-default" onClick={removeImage}>
                                        <i className="fas fa-trash"/>
                                    </button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        }

        {
            formIsOpen || <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TableCard {...table.food.card}>
                        <ASBar
                            keys={["name", "category_id.type"]}
                            create={toggleForm}
                            data={foods}
                            setData={setFoods}
                        />
                        <FoodTable
                            tableHeaderColor="primary"
                            tableHead={table.food.header}
                            tableData={foods}
                            options={{
                                remove: hd.remove,
                                edit: hd.edit,
                            }}
                        />
                    </TableCard>
                </GridItem>
            </GridContainer>
        }
    </AppLayoutContain>
);

ManageFood.propTypes = {
    classes: PropTypes.object
};

export default ManageFood;
