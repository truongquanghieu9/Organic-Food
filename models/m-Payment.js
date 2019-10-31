const mongoose = require("mongoose");
const db = require("../models");
const {spliceId, casDelete} = require("../utils/dbSupport");

const paymentSchema = new mongoose.Schema({
    card_number: String,
    card_type: String,
    expiration_date_month: Number,
    expiration_date_year: Number,
    csc: String,
    account_Name: String,
    bank_Name: String

}, {timestamp: true});

paymentSchema.pre("remove", async function(next){
    // try {
    //     await spliceId("Review", this.review_id, "people_id", this._id);
    //     await casDelete("User", "_id", this.user_id);
    //     return next();
    // } catch(err) {
    //     return next(err);
    // }
})

module.exports = mongoose.model("Payment", paymentSchema);
