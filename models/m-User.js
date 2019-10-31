const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("./index");
const {assignId} = require("../utils/dbSupport");

const userSchema = mongoose.Schema({
    viewname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        cloudId: String,
        link: {
            type: String,
            default: "https://images.unsplash.com/photo-1563729574084-950da51d3822?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixlib=rb-1.2.1&q=80&w=100"
        }
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    active: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function(next){
    try {
        //only hash the password if it is modified or new
        if(!this.isModified("password")) return next();

        let hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.pre("remove", async function(next){
    try {
        await db.UserRole.deleteMany({user: this._id});
        // await assignId("People", this._id, "user_id", false);
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
}

module.exports = mongoose.model("User", userSchema);
