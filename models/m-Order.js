const mongoose = require("mongoose");
const db = require("../models");
const {spliceId, casDelete} = require("../utils/dbSupport");

const orderSchema = new mongoose.Schema({
    people_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalPrice: Number,
    pay_type: {
        type: String,
        default: "COD"
    },
    status: {
        type: String,
        default: "Waiting"
    }
}, {timestamp: true});

orderSchema.pre("remove", async function(next){
    // try {
    //     let findOrderDetail = await db.OrderDetail.findOne({order_id: this._id});
    //     if(findOrderDetail) await findOrderDetail.remove();
    //     return next();
    // } catch(err) {
    //     return next(err);
    // }
})

module.exports = mongoose.model("Order", orderSchema);
