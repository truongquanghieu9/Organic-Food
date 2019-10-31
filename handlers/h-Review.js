const db = require("../models");
const {spliceId, pushId} = require("../utils/dbSupport");

exports.get = async(req, res, next) => {
    try {
        let review = await db.Review.find().populate("food_id").populate("people_id").exec();
        return res.status(200).json(review);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {food_id} = req.params;
        let reviewed = await db.Review.create({...req.body, food_id});

        // add review_id in food
        await pushId("Food", reviewed.food_id, "review_id", reviewed._id);

        return res.status(200).json(reviewed);
    }catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundReview = await db.Review.findById(req.params.review_id).populate("food_id");

        if(foundReview) {
            await spliceId("Food", foundReview.food_id, "review_id",  foundReview._id);
            foundReview.remove();
        }
        return res.status(200).json(foundReview);
    } catch(err) {
        return next(err);
    }
}

exports.update  = async(req, res, next) => {
    try {
        let updatedReview = await db.Review.findByIdAndUpdate(req.params.review_id, req.body, {new: true});

        return res.status(200).json(updatedReview);
    } catch(err) {
        return next(err);
    }
}
