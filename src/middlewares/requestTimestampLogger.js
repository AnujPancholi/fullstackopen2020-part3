"use strict";

const logRequestTime = (req,res,next) => {
  req.timestamp = Date.now();
  next();
}


module.exports = logRequestTime;