"use strict";

const logRequestTime = require('./requestTimestampLogger.js');
const handleErrors = require('./errorHandler.js');

module.exports = {
	logRequestTime,
	handleErrors
}