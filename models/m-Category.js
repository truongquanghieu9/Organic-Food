const mongoose = require("mongoose");
const db = require("../models");
const {assignId} = require("../utils/dbSupport");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    desc: String

})

categorySchema.pre("remove", async function(next){
    try {
        await assignId("Category", this._id, "category_id", false);
        return next();
    } catch (err) {
        return next(err);
    }
})

module.exports = mongoose.model("Category", categorySchema);
