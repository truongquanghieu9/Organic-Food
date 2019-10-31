const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

module.exports.User = require("./m-User");
module.exports.Role = require("./m-Role");
module.exports.UserRole = require("./m-UserRole");
module.exports.People = require("./m-People");
module.exports.Category = require("./m-Category");
module.exports.Image = require("./m-Image");
module.exports.Food = require("./m-Food");
module.exports.Review = require("./m-Review");
module.exports.Order = require("./m-Order");
module.exports.OrderDetail = require("./m-OrderDetail");
