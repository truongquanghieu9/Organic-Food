import React, {useState, useEffect, useCallback} from "react";
import ManageSoldout from "components/views/ManageSoldout";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

function ManageSoldoutContain({api, user, notify, ...props}) {
    const [foods, setFoods] = useState([]);

    const hdChange = (id, e) => {
        let newFood = foods.map(o => {
            if(o._id === id) {
                return {
                    ...o,
                    [e.target.name]: e.target.value
                }
            }
            return {...o};
        })
        setFoods(newFood);
    }

    const load = useCallback(async() => {
        try {
            let foodList = await apiCall("get", api.food.get(user._id));
            let filterQuantity = foodList.filter(item => item.quantity <= 0);
            setFoods(filterQuantity);
        } catch(err) {
            notify();
        }
    }, [api.food, notify, user._id])

    useEffect(() => {
        load();
    }, [load]);

    async function hdUpdateQuantity(food_id, quantity) {
        try {
            let updateFood = await apiCall("put", api.food.updateQuantity(user._id, food_id), {quantity});
            let newFood = foods.map(o => {
                if(o._id === updateFood._id) {
                    return {
                        ...o,
                        quantity: updateFood.quantity
                    }
                }
                return {...o};
            })
            setFoods(newFood);
            console.log(food_id, quantity);
            await load();
            return notify("Update food quantity successfully!", true);
        } catch (err) {
            console.log(err);
            notify("Food quantity is not updated");
        }
    }

    return <ManageSoldout
        {...props}
        foods={foods}
        setFoods={setFoods}
        hdChange={hdChange}
        hdUpdateQuantity= {hdUpdateQuantity}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ManageSoldoutContain));
