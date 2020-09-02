"use strict";

const Mongoose = require("mongoose");

const getObjectId = (_idString) => {
    return new Mongoose.Types.ObjectId(_idString);
}


module.exports = {
    getObjectId
}