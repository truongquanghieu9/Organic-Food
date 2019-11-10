import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";

import {apiCall, apiFdCall} from "services/apiCall";
import api from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

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

const DEFAULT_FOOD = {
    name: "",
    desc: "",
    quantity: "",
    price: "",
    discount: "",
    image_id: [],
    category_id: null
}

function ManageFood({user, notify, ...props}) {
    const [foods, setFoods] = useState([]);
    const [food, setFood] = useState(DEFAULT_FOOD);
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState([]);
    const [formIsOpen, setOpenForm] = useState(false);

    const toggleForm = () => setOpenForm(prev => !prev);

    const hdChange = (e) => {
        const {name, value} = e.target;
        setFood(prev => ({...prev, [name]: value}));
    }

    const removeImage = () => {
        setImage([]);
    }

    const getImage = (files) => {
        setImage(prev => ([...prev, ...files]));
    }

    async function hdConfirm() {
        try {
            if(food._id){
                await apiCall("put", api.food.update(user._id, food._id), food);
                notify("Modify food data successfully!", true);
            } else {
                let fd = new FormData();
                let hasImg = image.length > 0;
                if(hasImg){
                    if(hasImg){
                        image.forEach((file, i) => {
                            fd.append('images' , file);
                        })
                    }
                    fd.append("name", food.name);
                    fd.append("desc", food.desc);
                    fd.append("quantity", food.quantity);
                    fd.append("price", food.price);
                    fd.append("discount", food.discount);
                    fd.append("category_id", food.category_id);
                    await apiFdCall("post", api.food.create(user._id), fd);
                    notify("Add new food successfully!", true);
                    setImage([]);
                } else {
                    return notify("Cannot submit");
                }
            }
            await load();
            setOpenForm(false);
        } catch(err) {
            console.log(err);
            notify();
        }
    }

    const load = useCallback(async() => {
        try {
            let foodList = await apiCall("get", api.food.get(user._id));
            let categoryList = await apiCall("get", api.category.get(user._id));
            categoryList = categoryList.map(pr => ({...pr, select: false}));
            setFoods(foodList);
            setFood(DEFAULT_FOOD);
            setCategory(categoryList);
        } catch(err) {
            notify();
        }
    }, [notify, user._id])

    useEffect(() => {
        load();
    }, [load]);


    async function hdRemove(food_id) {
        try {
            if(window.confirm("Are you sure to remove this data?")){
                await apiCall("delete", api.food.delete(user._id, food_id));
                await load();
            }
            return notify("Delete food successfully!", true);
        } catch(err) {
            notify();
        }
    }

    function selectCategory(category_id) {
        return setFood(prev => ({...prev, category_id}));
    }

    async function hdEdit(food_id) {
        try {
            let foodOne = await apiCall("get", api.food.getOne(user._id, food_id));
            setFood(foodOne);
            setOpenForm(true);
        } catch(err) {
            notify();
        }
    }

    return (
        <div>
            {
                formIsOpen && <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <TitleBox title="Create New food" subtitle="Here is a subtitle for this table"/>
                        <ConfirmBar cancel={toggleForm} confirm={hdConfirm}/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                        <Card customCss="custom-card">
                            <CustomCardHeader title="New Food Information" subtitle="Please fill in suitable information"/>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={6} md={8}>
                                        <FormInput
                                            type="text"
                                            label="Food Name"
                                            placeholder="Food Name"
                                            name="name"
                                            value={food.name}
                                            onChange={hdChange}
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
                                            onChange={hdChange}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={4}>
                                        <FormInput
                                            type="number"
                                            label="Quantity"
                                            placeholder="Quantity"
                                            name="quantity"
                                            value={food.quantity}
                                            onChange={hdChange}
                                            required
                                        />
                                        <FormInput
                                            type="number"
                                            label="Price"
                                            placeholder="Price"
                                            name="price"
                                            value={food.price}
                                            onChange={hdChange}
                                            required
                                        />
                                        <FormInput
                                            type="number"
                                            label="Discount"
                                            placeholder="Discount"
                                            name="discount"
                                            value={food.discount}
                                            onChange={hdChange}
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
                            <CustomCardHeader title="New Image" subtitle="Please drop image for food"/>
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
                                                    <ListImage images={image}/>
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
                        <TableCard title="Food List" subtitle="Food of shop">
                            <ASBar
                                keys={["name", "category_id.type"]}
                                create={toggleForm}
                                data={foods}
                                setData={setFoods}
                            />
                            <FoodTable
                                tableHeaderColor="primary"
                                tableHead={["ID", "Name", "Quantity", "Price", "Discount", "Image", "Category", "Options"]}
                                tableData={foods}
                                options={{
                                    remove: hdRemove,
                                    edit: hdEdit,
                                }}
                            />
                        </TableCard>
                    </GridItem>
                </GridContainer>
            }
        </div>
    )
}

function mapState({user}) {
    return {user: user.data}
}

ManageFood.propTypes = {
    classes: PropTypes.object
};

export default connect(mapState, null)(withNoti(ManageFood));
