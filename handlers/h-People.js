const db = require("../models");
const {spliceId} = require("../utils/dbSupport");

exports.get = async(req, res, next) => {
    try {
        let people = await db.People.find().populate("user_id").exec();
        return res.status(200).json(people);
    } catch(err) {
        return next(err);
    }
}

exports.getWish = async(req, res, next) => {
    try {
        let getFood = await db.People.find().populate("wishlist").exec();
        return res.status(200).json(getFood);
    } catch(err) {
        return next(err);
    }
}

exports.unWish = async(req, res, next) => {
    try {
        const {people_id, food_id} = req.params;
        // let foundPeople = await db.People.findOne({people_id, wishlist: food_id});
        let foundPeople = await db.People.findById(people_id).populate("wishlist").exec();
        if(foundPeople) {
            await spliceId("People", foundPeople.wishlist, "food_id", food_id);
            foundPeople.remove();
        }
        return res.status(200).json(foundPeople);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundPeople = await db.People.findById(req.params.people_id);
        if(foundPeople) foundPeople.remove();
        return res.status(200).json(foundPeople);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let people = await db.People.findById({_id: req.params.people_id});
        return res.status(200).json(people);
    } catch(err) {
        return next(err);
    }
}

exports.update  = async(req, res, next) => {
    try {
        let updatedPeople = await db.People.findByIdAndUpdate(req.params.people_id, req.body, {new: true});

        return res.status(200).json(updatedPeople);
    } catch(err) {
        return next(err);
    }
}
