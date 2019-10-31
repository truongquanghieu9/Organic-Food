const db = require("../models");

exports.create = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        const {orderDetails, order} = req.body;

        // Create Order and get order_id
        let newOrder = await db.Order.create({...order, user_id});

        // add order_id for orderDetail
        for(let e of orderDetails) {
            await db.OrderDetail.create({
                order_id: newOrder._id,
                ...e
            });
        }

        // Check pay_type and make request
        // if(order.pay_type === "OP")

        // send mail to customer

        return res.status(200).json(newOrder);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let getOrder = await db.Order.find(user_id ? {user_id} : {});
        return res.status(200).json(getOrder);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let getOrder = await db.Order.findById(order_id).populate("user_id").exec();
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
