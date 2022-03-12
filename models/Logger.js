const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const LoggerSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    zone: {
        type: String,
        require: true
    },
    wereda: {
        type: String,
        require: true
    },
    kebele: {
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


LoggerSchema.pre('save', function (next) {
    const saltRounds = 10;
    if (this.isNew || this.isModified('password')) {
        const logger = this;
        bcrypt.hash(logger.password, saltRounds,
            function (err, hashedPassword) {

                if (err) {
                    next(err);
                }
                else {
                    logger.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});


LoggerSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err, false);
        } else {
            callback(null, same);
        }
    });
}

module.exports = mongoose.model("Loggers", LoggerSchema)