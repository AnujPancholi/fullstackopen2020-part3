"use strict";

const errorHandler = (errObj,req,res,next) => {

    const additionalProperties = errObj.additionalProperties || {};
  
    // console.log("Handling error...");
  
    res.status(errObj.httpStatusCode || 500).send({
      message: errObj.err && errObj.err.message ? errObj.err.message : "INTERNAL SERVER ERROR",
      ...additionalProperties
    })
  
}

module.exports = errorHandler;