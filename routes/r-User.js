const express = require("express");
const hdl = require("../handlers");
const mw = require("../middleware");
const router = express.Router({mergeParams: true});

router.route("/").get(hdl.User.get);
router.route("/getAll").get(hdl.User.getAll);

router.route("/signup").post(mw.User.generateAvatar, hdl.User.signUp);
router.route("/login").post(hdl.User.logIn);

router.route("/:user_id")
.get(hdl.User.getOne)
.delete(hdl.User.remove)
.put(hdl.User.update);

router.route("/:user_id/activate").put(hdl.User.activate);
router.route("/:user_id/password").put(hdl.User.updatePassword);

router.use("/:user_id/people", mw.User.isLogin, require("./r-People"));
router.use("/:user_id/orders", require("./r-Order"));
router.use("/:user_id/reviews", require("./r-Review"));

module.exports = router;
