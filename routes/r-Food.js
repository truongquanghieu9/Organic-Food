const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Food.get)
.post(upload.fields([{name: "images"}]), mw.Food.getUploadData, hdl.Food.create);

router.route("/:food_id")
.get(hdl.Food.getOne)
.delete(mw.User.isCorrect, mw.User.isPermit, hdl.Food.remove)
.put(mw.User.isCorrect, mw.User.isPermit, hdl.Food.update);


router.route("/:food_id/updateQuantity").put(hdl.Food.updateQuantity);
router.route("/:food_id/wish").put(hdl.Food.wishlist);

router.use("/:food_id/images", require("./r-Image"));
router.use("/:food_id/people", require("./r-People"));
router.use("/:food_id/review", require("./r-Review"));

module.exports = router;
