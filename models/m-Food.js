const mongoose = require("mongoose");
const db = require("./index");
const {spliceId, assignId} = require("../utils/dbSupport");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    desc: String,
    quantity: Number,
    price: Number,
    discount: Number,
    review_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    image_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    ],
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, {timestamp: true});

foodSchema.pre("remove", async function(next){
    try {
        // Remove in Image and Review
        // for(let img of this.image_id) {
        //     let foundImg = await db.Image.findOne({image_id: img});
        //     if(foundImg) await foundImg.remove();
        // }
        // for(let rev of this.review_id) {
        //     let foundReview = await db.Review.findOne({review_id: rev});
        //     if(foundReview) await foundReview.remove();
        // }
        if(this.image_id) await db.Image.deleteMany({_id: {$in: this.image_id}});
        if(this.review_id) await db.Review.deleteMany({_id: {$in: this.review_id}});
        // remove in OrderDetail
        let foundFood = await db.OrderDetail.findOne({food_id: this._id});
        if(foundFood) await assignId("OrderDetail", id, "food_id", false);
        // remove food in People wishlist
        let foundWishFood = await db.People.findOne({wishlist: this._id});
        if(foundWishFood) await spliceId("People", foundWishFood.wishlist, "food_id", this._id);
        return next();
    } catch (err) {
        return next(err);
    }
})

module.exports = mongoose.model("Food", foodSchema);
