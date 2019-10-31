const db = require("../models");

exports.get = async(req, res, next) => {
    try{
        let categories = await db.Category.find();
        return res.status(200).json(categories);
    } catch(err){
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try{
        let cate = await db.Category.findById({_id: req.params.category_id});
        return res.status(200).json(cate);
    } catch (err){
        return next(err);
    }
}


exports.create = async(req, res, next) => {
    try {
        let newCate = await db.Category.create(req.body);
        return res.status(200).json(newCate);
    } catch (err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundCate = await db.Category.findById({_id: req.params.category_id});
        if(foundCate) foundCate.remove();
        return res.status(200).json(foundCate);
    } catch(err) {
        return next(err);
    }
}

exports.update  = async(req, res, next) => {
    try {
        let updatedCate = await db.Category.findByIdAndUpdate(req.params.category_id, req.body, {new: true});

        return res.status(200).json(updatedCate);
    } catch(err) {
        return next(err);
    }
}
