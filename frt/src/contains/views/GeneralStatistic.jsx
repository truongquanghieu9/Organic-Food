import React, {useState, useEffect, useCallback} from "react";
import GeneralStatistic from "components/views/GeneralStatistic";
import {apiCall} from "services/api";
import {connect} from "react-redux";
import withNoti from "hocs/withNoti";

function GeneralStatisticContain({api, user, notify, ...props}) {
    // const [orders, setOrders] = useState([]);
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);

    const load = useCallback(async() => {
        try {
            let orderList = await apiCall("get", api.statistic.getOrderDetai(user._id));
            // setOrders(orderList);
            
            // flat order by food_id
            let flatOrder = orderList.reduce((acc, next) => {
                let orders = acc.length > 0 ? acc.map(a => a.food_id._id) : [];
                if(orders.indexOf(next.food_id._id) === -1) {
                    acc.push(next);
                } else {
                    acc.forEach(a => {
                        if(a.food_id._id === next.food_id._id) a.quantity += next.quantity;
                    })
                }
                return acc;
            }, []);
            // sort food follow quantity from high to low
            let sorted = array => array.reduce((total, element) => {
                const lessOrEqual = total.filter(item => item.quantity <= element.quantity);
                const greater = total.filter(item => item.quantity > element.quantity);
                return [...greater, element, ...lessOrEqual];
            }, []);
            // over totalPrice foodName categoryName quantity
            let overFoodKey = sorted(flatOrder).map(o => {
                if(o.quantity > 0 && o.price > 0) {
                    return {
                        ...o,
                        totalPrice: o.quantity*o.price,
                        foodName: o.food_id.name,
                        categoryName: o.food_id.category_id.name
                    }
                } 
                return {...o};
            });
            setFoods(overFoodKey);

            // flat food by categoryName
            let flatFood = overFoodKey.reduce((acc, next) => {
                let orders = acc.length > 0 ? acc.map(a => a.categoryName) : [];
                if(orders.indexOf(next.categoryName) === -1) {
                    acc.push(next);
                } else {
                    acc.forEach(a => {
                        if(a.categoryName === next.categoryName) {
                            a.quantity += next.quantity;
                            a.totalPrice += next.totalPrice;
                        }
                    })
                }
                return acc;
            }, []);
            setCategories(flatFood);
        } catch(err) {
            notify();
        }
    }, [api.statistic, notify, user._id])

    function bestAmountFood(product) {
        let data;
        if(product.length > 0) {
            let randthree = () => (Math.random() * (200 - 50) + 50).toFixed(0);
            let randlightdark = () => (Math.random() * (0.4 - 0.2) + 0.2).toFixed(2);
            product.splice(10);
            let dataset = [];
            product.map(item => {
                dataset.push({
                    label: item.foodName,
                    backgroundColor: `rgba(${randthree()},${randthree()},${randthree()},${randlightdark()})`,
                    borderColor: `rgba(${randthree()},${randthree()},${randthree()}, 1)`,
                    borderWidth: 1,
                    data: [item.quantity]
                });
                return dataset;
            })
            data = {
                labels: ["Best 10 products"],
                datasets: dataset
            }
        }
        return data;
    }

    function bestAmountCate(cate) {
        let data;
        if(cate.length > 0) {
            let randthree = () => (Math.random() * (200 - 50) + 50).toFixed(0);
            let randlightdark = () => (Math.random() * (0.4 - 0.2) + 0.2).toFixed(2);
            cate.splice(5);
            let dataset = [];
            cate.map(item => {
                dataset.push({
                    label: item.categoryName,
                    backgroundColor: `rgba(${randthree()},${randthree()},${randthree()},${randlightdark()})`,
                    borderColor: `rgba(${randthree()},${randthree()},${randthree()}, 1)`,
                    borderWidth: 1,
                    data: [item.quantity]
                });
                return dataset;
            })
            data = {
                labels: ["Best 5 category"],
                datasets: dataset
            }
        }
        return data;
    }

    function bestPriceFood(product) {
        let data;
        if(product.length > 0) {
            let randthree = () => (Math.random() * (200 - 50) + 50).toFixed(0);
            let randlightdark = () => (Math.random() * (0.4 - 0.2) + 0.2).toFixed(2);
            product.splice(10);
            let dataset = [];
            product.map(item => {
                dataset.push({
                    label: item.foodName,
                    backgroundColor: `rgba(${randthree()},${randthree()},${randthree()},${randlightdark()})`,
                    borderColor: `rgba(${randthree()},${randthree()},${randthree()}, 1)`,
                    borderWidth: 1,
                    data: [item.totalPrice]
                });
                return dataset;
            })
            data = {
                labels: ["Best 10 products"],
                datasets: dataset
            }
        }
        return data;
    }

    function bestPriceCate(cate) {
        let data;
        if(cate.length > 0) {
            let randthree = () => (Math.random() * (200 - 50) + 50).toFixed(0);
            let randlightdark = () => (Math.random() * (0.4 - 0.2) + 0.2).toFixed(2);
            cate.splice(5);
            let dataset = [];
            cate.map(item => {
                dataset.push({
                    label: item.categoryName,
                    backgroundColor: `rgba(${randthree()},${randthree()},${randthree()},${randlightdark()})`,
                    borderColor: `rgba(${randthree()},${randthree()},${randthree()}, 1)`,
                    borderWidth: 1,
                    data: [item.totalPrice]
                });
                return dataset;
            })
            data = {
                labels: ["Best 5 category"],
                datasets: dataset
            }
        }
        return data;
    }

    useEffect(() => {
        load();
    }, [load]);

    return <GeneralStatistic
        {...props}
        foods = {foods}
        categories = {categories}
        bestAmountFood = {bestAmountFood(foods)}
        bestAmountCate = {bestAmountCate(categories)}
        bestPriceFood = {bestPriceFood(foods)}
        bestPriceCate = {bestPriceCate(categories)}
    />
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(GeneralStatisticContain));
