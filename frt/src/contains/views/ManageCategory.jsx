import React, {useState, useEffect} from "react";
import ManageCategory from "components/views/ManageCategory";
import {apiCall} from "services/apiCall";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

const DEFAULT_CATEGORY = {
    name: "",
    desc: ""
}

function ManageCategoryContain({api, user, notify, ...props}) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(DEFAULT_CATEGORY);
    const [formIsOpen, setOpenForm] = useState(false);

    const toggleForm = () => setOpenForm(prev => !prev);

    const hdChange = (e) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    }

    async function hdConfirm() {
        try {
            if(category._id){
                await apiCall("put", api.update(user._id, category._id), category);
            } else {
                await apiCall("post", api.create(user._id), category);
            }
            await load();
            setOpenForm(false);
            return notify("A new category is created successfully!", true);
        } catch(err) {
            console.log(err);
            notify();
        }
    }

    useEffect(() => {
        let isLoaded = false;
        if(!isLoaded) load();
        return () => {
            isLoaded = true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function load() {
        try {
            let categoryList = await apiCall("get", api.get(user._id));
            setCategories(categoryList);
            setCategory(DEFAULT_CATEGORY);
        } catch(err) {
            notify();
        }
    }

    async function hdRemove(category_id) {
        try {
            if(window.confirm("Are you sure to remove this data?")){
                await apiCall("delete", api.delete(user._id, category_id));
                await load();
            }
            return notify("Delete category successfully!", true);
        } catch(err) {
            notify();
        }
    }

    async function hdEdit(category_id) {
        try {
            let categoryOne = await apiCall("get", api.getOne(user._id, category_id));
            setCategory(categoryOne);
            setOpenForm(true);
        } catch(err) {
            notify();
        }
    }

    return <ManageCategory
        {...props}
        category={category}
        categories={categories}
        setCategories={setCategories}
        toggleForm={toggleForm}
        formIsOpen={formIsOpen}
        hd={{
            confirm: hdConfirm,
            remove: hdRemove,
            change: hdChange,
            edit: hdEdit
        }}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ManageCategoryContain));
