const mongoose = require("mongoose");
const db = require("../models");
const {spliceId} = require("../utils/dbSupport");

const reviewSchema = new mongoose.Schema({
    rate: Number,
	title: String,
	content: String,
    people_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }
}, {timestamp: true});

reviewSchema.pre("remove", async function(next){
    try {
        await spliceId("Food", this.food_id, "review_id", this._id);
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Review", reviewSchema);
