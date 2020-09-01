"use strict";

const Mongoose = require("mongoose");

const EntrySchema = new Mongoose.schema({
	name: String,
	phoneNumber: String
})

EntrySchema.set('toJSON',{
	transform: (doc,obj) => {
		obj.id = obj._id.toString();
		delete obj._id;
		delete obj._v;
	}
})

const Entry = Mongoose.model('Entry',EntrySchema);

module.exports = Entry;