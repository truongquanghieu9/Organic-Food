const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middleware");

router.route("/")
.get(hdl.Category.get)
.post(mw.User.isCorrect, mw.User.isPermit, hdl.Category.create);

router.route("/:category_id")
.get(hdl.Category.getOne)
.delete(mw.User.isCorrect, mw.User.isPermit, hdl.Category.remove)
.put(mw.User.isCorrect, mw.User.isPermit, hdl.Category.update);

module.exports = router;
