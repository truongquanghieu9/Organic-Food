const db = require("../models");
const {pushId, spliceId} = require("../utils/dbSupport");
const mail = require("../utils/mail");
const moment = require("moment");

exports.get = async(req, res, next) => {
    try {
        let list = await db.Food.find()
            .populate("category_id")
            .populate("review_id")
            .populate("image_id")
            .exec();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let one = await db.Food.findById(req.params.food_id)
            .populate("category_id")
            .populate("image_id")
            .populate("review_id")
            .exec();
        return res.status(200).json(one);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let createdFood = await db.Food.create(req.body);
        await createdFood.save();

        return res.status(200).json(createdFood);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundFood = await db.Food.findById(req.params.food_id);
        if(foundFood) await foundFood.remove();
        return res.status(200).json(foundFood);
    } catch(err) {
        return next(err);
    }
}

exports.wishlist = async(req, res, next) => {
    try {
        const {food_id, people_id} = req.params;
        let foundPeople = await db.People.findById(people_id);

        // push food_id to wishlist array in People
        if(foundPeople) {
            foundPeople.wishlist.push(food_id);
            await foundPeople.save();
        }
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const {food_id} = req.params;
        let {name, desc, quantity, price, discount, review_id, image_id, category_id} = req.body;
        review_id = review_id.map(p => p._id);
        image_id = image_id.map(p => p._id);

        let foundFood = await db.Food.findById(food_id);

        // remove old image and add new image
        let oldImage = foundFood.image_id.filter(id => image_id.indexOf(id) === -1);
        let curImage = foundFood.image_id.filter(id => image_id.indexOf(id) !== -1);
        let newImage = image_id.filter(id => curImage.indexOf(id) === -1);
        // remove image
        if(oldImage.length > 0) {
            for(let id of oldImage) {
                let foundImg = await db.Image.findById(id);
                if(foundImg) await foundImg.remove();
            }
        }
        let updateImage = [...curImage, ...newImage];

        // remove old review and add new review
        let oldReview = foundFood.review_id.filter(id => review_id.indexOf(id) === -1);
        let curReview = foundFood.review_id.filter(id => review_id.indexOf(id) !== -1);
        let newReview = review_id.filter(id => curReview.indexOf(id) === -1);
        // remove review
        if(oldImage.length > 0) {
            for(let id of oldReview) {
                let foundRev = await db.Review.findById(id);
                if(foundRev) await foundRev.remove();
            }
        }
        let updateReview = [...curReview, ...newReview];

        // update food
        let updateFood = await db.Food.findById(food_id);
        updateFood.name = name;
        updateFood.desc = desc;
        updateFood.quantity = quantity;
        updateFood.price = price;
        updateFood.discount = discount;
        updateFood.image_id = updateImage;
        updateFood.review_id = updateReview;
        updateFood.category_id = category_id;
        // if(updateFood.category_id !== category_id) {
        //     await spliceId("Category", updateFood.category_id, "food_id", updateFood._id);
        //     updateFood.category_id = category_id;
        //     await pushId("Category", category_id, "food_id", updateFood._id);
        // }
        await updateFood.save();
        return res.status(200).json(updateFood);
    } catch(err) {
        return next(err);
    }
}

exports.updateQuantity = async(req, res, next) => {
    try {
        const {food_id} = req.params;
        let foundFood = await db.Food.findById(food_id);
        if(foundFood) {
            foundFood.quantity = req.body.quantity;
            await foundFood.save();
        }
        return res.status(200).json(foundFood);
    } catch(err) {
        return next(err);
    }
}