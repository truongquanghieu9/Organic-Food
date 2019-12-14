const express = require("express");
const hdl = require("../handlers");
const mw = require("../middleware");
const router = express.Router({mergeParams: true});

router.route("/").get(hdl.User.get);
router.route("/getAll").get(hdl.User.getAll);

router.route("/signup").post(mw.User.generateAvatar, hdl.User.signUp);
router.route("/social").post(mw.User.genPassword, hdl.User.social);
router.route("/login").post(hdl.User.logIn);

router.route("/:user_id")
.get(hdl.User.getOne)
.delete(hdl.User.remove)
.put(hdl.User.update);

router.route("/:user_id/getUserOrdered").get(hdl.User.getUserOrdered);
router.route("/:user_id/getAllOrderDetail").get(hdl.User.getAllOrderDetail);
router.route("/:user_id/getpeople").get(hdl.User.getPeople);
router.route("/:user_id/activate").put(hdl.User.activate);
router.route("/:user_id/password").put(hdl.User.updatePassword);

router.use("/:user_id/people", require("./r-People"));
router.use("/:user_id/orders", require("./r-Order"));
router.use("/:user_id/reviews", require("./r-Review"));
router.use("/:user_id/categories", require("./r-Category"));
router.use("/:user_id/foods", require("./r-Food"));

module.exports = router;
