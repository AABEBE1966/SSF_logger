const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    armType: {
        type: String,
        require: true
    },
    licenseNumber: {
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
    bulletNumber: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Persons", PersonSchema)