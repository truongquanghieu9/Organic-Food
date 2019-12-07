const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
.get(hdl.Order.get)
.post(hdl.Order.create);

router.route("/:order_id")
.get(hdl.Order.getOne)
.put(hdl.Order.update);

router.route("/:order_id/orderDetail").get(hdl.Order.getOrderDetail);

module.exports = router;
