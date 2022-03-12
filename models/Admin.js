const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const adminEmails = ["nefnegn@gmail.com"]
const AdminSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{ type: String }],
})


AdminSchema.pre('save', function (next) {
    const saltRounds = 10;
    if (this.isNew || this.isModified('password')) {
        const admin = this;
        bcrypt.hash(admin.password, saltRounds,
            function (err, hashedPassword) {

                if (err) {
                    next(err);
                }
                else {
                    admin.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});


AdminSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err, false);
        } else {
            callback(null, same);
        }
    });
}

module.exports = mongoose.model("Admins", AdminSchema)