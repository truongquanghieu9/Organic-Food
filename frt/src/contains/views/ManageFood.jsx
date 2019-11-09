import React, {useState, useEffect, useCallback} from "react";
import ManageFood from "components/views/ManageFood";
import {apiCall, apiFdCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

const DEFAULT_FOOD = {
    name: "",
    desc: "",
    quantity: "",
    price: "",
    discount: "",
    image_id: [],
    category_id: null
}

function ManageFoodContain({api, user, notify, ...props}) {
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
    }, [api.category, api.food, notify, user._id])

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

    return <ManageFood
        {...props}
        food={food}
        foods={foods}
        setFoods={setFoods}
        toggleForm={toggleForm}
        formIsOpen={formIsOpen}
        hd={{
            confirm: hdConfirm,
            remove: hdRemove,
            change: hdChange,
            edit: hdEdit
        }}
        selectCategory={selectCategory}
        category={category}
        setCategory={setCategory}
        image={image}
        removeImage={removeImage}
        getImage={getImage}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ManageFoodContain));
