const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middleware");

router.route("/")
.get(hdl.Review.get)
.post(mw.User.isCorrect, mw.User.isPermit, hdl.Review.create);

router.route("/:review_id")
.delete(mw.User.isCorrect, mw.User.isPermit, hdl.Review.remove)
.put(mw.User.isCorrect, mw.User.isPermit, hdl.Review.update);

module.exports = router;
