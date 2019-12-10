const mongoose = require("mongoose");
const db = require("../models");
const {spliceId, casDelete} = require("../utils/dbSupport");

const orderDetailSchema = new mongoose.Schema({
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    quantity: Number,
    price: Number,
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }
}, {timestamps: true});

orderDetailSchema.pre("remove", async function(next){
    // try {
    //     await spliceId("Review", this.review_id, "people_id", this._id);
    //     await casDelete("User", "_id", this.user_id);
    //     return next();
    // } catch(err) {
    //     return next(err);
    // }
})

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
