"use strict";

const Mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const EntrySchema = new Mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	phoneNumber: String
})

EntrySchema.plugin(uniqueValidator);

EntrySchema.set('toJSON',{
	transform: (doc,obj) => {
		obj.id = obj._id.toString();
		delete obj._id;
		delete obj.__v;
	}
})

const Entry = Mongoose.model('Entry',EntrySchema);

module.exports = Entry;