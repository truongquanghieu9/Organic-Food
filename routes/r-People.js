const express = require("express");
const router = express.Router();
const hdl = require("../handlers");

router.route("/").get(hdl.People.get);

router.route("/:people_id")
.get(hdl.People.getOne)
.delete(hdl.People.remove)
.put(hdl.People.update);

router.route("/:people_id/getWish").get(hdl.People.getWish);
router.route("/:people_id/unWish").put(hdl.People.unWish);

router.use("/:people_id/reviews", require("./r-Review"));
router.use("/:people_id/orders", require("./r-Order"));

module.exports = router;
