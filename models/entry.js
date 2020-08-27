"use strict";

const Mongoose = require("mongoose");

const EntrySchema = new Mongoose.schema({
	name: String,
	phoneNumber: String
})

const Entry = Mongoose.model('Entry',EntrySchema);

module.exports Entry;