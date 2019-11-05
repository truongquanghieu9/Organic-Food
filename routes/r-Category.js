const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middleware");

router.route("/")
.get(hdl.Category.get)
.post(hdl.Category.create);

router.route("/:category_id")
.get(hdl.Category.getOne)
.delete(hdl.Category.remove)
.put(hdl.Category.update);

module.exports = router;
