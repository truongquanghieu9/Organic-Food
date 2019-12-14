const db = require("../models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.create = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        const {orderDetails, order, stripeToken} = req.body;

        if(stripeToken) {
            let charge = await stripe.charges.create({
                amount: order.totalPrice,
                currency: 'usd',
                source: stripeToken,
                description: 'Charge for order food',
            })
            if(charge.paid) order.status = "Paid by OL";
        }

        // update quantity in food after order
        for(let e of orderDetails) {
            let foundFood = await db.Food.findById(e.food_id);
            if(foundFood) {
                foundFood.quantity -= e.quantity;
                await foundFood.save(); 
            }
        }

        // Create Order and get order_id
        let newOrder = await db.Order.create({...order, user_id});

        // add order_id for orderDetail
        for(let e of orderDetails) {
            await db.OrderDetail.create({
                order_id: newOrder._id,
                ...e
            });
        }

        // send mail to customer

        return res.status(200).json(newOrder);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        // let getOrder = await db.Order.find(user_id ? {user_id} : {});
        let getOrder = await db.Order.find().populate("user_id").exec();
        return res.status(200).json(getOrder);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let getOrder = await db.Order.findById(order_id)
            .populate({
                path: "user_id",
                populate: {
                    path: "people_id"
                }
            })
            .exec();
        return res.status(200).json(getOrder);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let foundOrder = await db.Order.findById(order_id);
        if(foundOrder) {
            foundOrder.status = req.body.status;
            await foundOrder.save();
        }
        return res.status(200).json(foundOrder);
    } catch(err) {
        return next(err);
    }
}

exports.getOrderDetail = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let getOrderDetail = await db.OrderDetail.find({order_id})
            .populate({
                path: "food_id",
                populate: {
                    path: "category_id"
                }
            })
            .populate({
                path: "food_id",
                populate: {
                    path: "image_id"
                }
            })
            .exec();
        console.log("run");
        return res.status(200).json(getOrderDetail);
    } catch(err) {
        return next(err);
    }
}