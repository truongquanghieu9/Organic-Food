const mongoose = require("mongoose");
const db = require("../models");
const {deleteMany, casDelete} = require("../utils/dbSupport");

const peopleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: String,
    phone: Number,
    birthDate: {
        type: Date,
        default: Date.now
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
    ]
})

peopleSchema.pre("remove", async function(next){
    try {
        await db.Review.deleteMany({people_id: this._id});
        await db.Order.deleteMany({people_id: this._id});
        await casDelete("User", "_id", this.user_id);
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("People", peopleSchema);
