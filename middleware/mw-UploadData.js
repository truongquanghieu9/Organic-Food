const {cloudinary} = require("../utils/uploader");
const db = require("../models");

exports.getUploadData = async(req, res, next) => {
    try{
        if(req.files){
            const {images} = req.files;
            let imgList = [];
            if(images){
                for(let img of images){
                    let image = await cloudinary.v2.uploader.upload(img.path);
                    let uploadImg = {
                        link: image.secure_url,
                        cloud_id: image.public_id
                    }
                    let createdImg = await db.Image.create(uploadImg);
                    imgList.push(createdImg._id);
                }
            }
            req.body.image_id = imgList;
        }
        next();
    } catch(err) {
        return next(err);
    }
}
