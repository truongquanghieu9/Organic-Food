const mongoose = require("mongoose");
const db = require("../models");
const {assignId} = require("../utils/dbSupport");
const {cloudinary} = require("../utils/uploader");

const imageSchema = new mongoose.Schema({
    cloud_id: String,
	link: String,
    uploadedAt:{
        type: Date,
        default: Date.now
    }
})

imageSchema.pre("remove", async function(next) {
	try {
		cloudinary.v2.uploader.destroy(this.image.cloud_id);
		return next();
	} catch(err) {
		return next(err);
	}
});

module.exports = mongoose.model("Image", imageSchema);
