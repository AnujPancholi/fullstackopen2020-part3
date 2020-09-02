"use strict";

const Mongoose = require("mongoose");

const EntrySchema = new Mongoose.Schema({
	name: String,
	phoneNumber: String
})

EntrySchema.set('toJSON',{
	transform: (doc,obj) => {
		obj.id = obj._id.toString();
		delete obj._id;
		delete obj.__v;
	}
})

const Entry = Mongoose.model('Entry',EntrySchema);

module.exports = Entry;