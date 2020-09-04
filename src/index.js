"use strict";


require("dotenv").config();
const Mongoose = require("mongoose");
Mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//adding port from env variables for deploy
const CONFIG = {
	port: process.env.PORT || 3001,
  dateFilePath: `${__dirname}/../data.json`
}
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const DATA = require(CONFIG.dateFilePath);
const {
  logRequestTime,
  handleErrors
} = require('./middlewares/index.js');
const handlebars = require('express-handlebars');
const morgan = require("morgan");
const cors = require('cors');
const dbUtils = require("./lib/dbUtils.js");

const EntryModel = require('./models/entry.js');
const { resolve } = require("path");

const getNewId = () => {
  return String(Math.floor(Math.random()*1000000));
}

const app = express();


app.use(cors());

app.engine('hbs',handlebars({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(logRequestTime);

//using static content from the build directory
app.use(express.static('build'));


morgan.token('requestPayload', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url RESCODE :status - RESTIME :response-time ms - PAYLOAD :requestPayload',{
	skip: (req,res) => req.method!="POST"
}))

app.use(morgan('tiny',{
	skip: (req,res) => req.method==="POST"
}));




//Endpoint to get all person records - Exercise 3.1
app.get('/api/persons',(req,res,next) => {
  (async() => {
    try{
      const entriesResult = await EntryModel.find({});
      res.send(entriesResult);
    }catch(e){
      console.error(`GET /persons | ERROR GETTING ENTRIES`,e);
      next({
        err: e
      });
    }
  })();
})


app.get(`/api/persons/:id`,async(req,res,next) => {

  (async() => {
    try{
      const entryResult = await EntryModel.findOne({
        _id: dbUtils.getObjectId(req.params.id)
      });
      res.send(entryResult);
    }catch(e){
      console.error(`GET /persons/:id | ERROR GETTING ENTRY`);
      next({
        err: e
      });
    }
  })()

})



app.delete("/api/persons/:id",(req,res,next) => {
    //deletion in db
    (async() => {
      let responseCode = 500;
      try{
        const deleteResult = await EntryModel.deleteOne({
          _id: dbUtils.getObjectId(req.params.id)
        })
        if(deleteResult.deletedCount>0){
          res.send({
            message: `ID ${req.params.id} DELETED`,
            deletedCount: deleteResult.deletedCount
          })
        } else {
          responseCode=404;
          throw new Error(`ID ${req.params.id} NOT FOUND`);
        }
      }catch(e){
        console.error(`DELETE /persons/:id | ERROR `,e);
        next({
          err: e,
          httpStatusCode: responseCode
        })
      }
    })()
})


app.post('/api/persons',(req,res,next) => {

  
  //adding new phonebook entry in db
  (async() => {
    const person = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber
    }
  
    const responseProperties = {
      body: {},
      statusCode: 204,
      err: null
    }

    try{
      if(!person.name || !person.phoneNumber){
        responseProperties.statusCode=400;
        throw new Error("MANDATORY PARAM MISSING");
      }
  
      // const existingPerson = await EntryModel.findOne({
      //   name: person.name
      // })
      // if(!!existingPerson){
      //   responseProperties.statusCode=404;
      //   throw new Error(`NAME ${person.name} ALREADY EXISTS`);
      // }
  
      const personEntry = new EntryModel({
        name: person.name,
        phoneNumber: person.phoneNumber
      })

      const personSaveResult = await personEntry.save();
  
      responseProperties.body = {
        message: `NEW RECORD UPDATED`,
        person: person
      }
      responseProperties.statusCode = 200;
  
    }catch(e){
      console.error(`PERSONS|POST|ERROR`,e);
      responseProperties.statusCode = responseProperties.statusCode<400 ? 500 : responseProperties.statusCode;
      responseProperties.err = e;
    }

    if(responseProperties.err){
      //change response code if validation error
      if(responseProperties.err.name==="ValidationError"){
        console.log(responseProperties.err.errors)
        responseProperties.statusCode = 400;
      }

      responseProperties.httpStatusCode = responseProperties.statusCode;
      next(responseProperties);
    } else {
      res.status(responseProperties.statusCode).send(responseProperties.body);
    }

    
  })();

  

  

})

//put request to change properties in an entry
app.put('/api/persons/:id',(req,res,next) => {

  //changing data in db
  (async() => {
    const personId = req.params.id;

  const updateProperties = req.body;

  //in case a malicious request tries to change the id of the record
  delete updateProperties.id;

  const responseProperties = {
    body: {},
    statusCode: 204,
    err: null
  }

  try{
    const existingPerson = await EntryModel.findOne({
      _id: dbUtils.getObjectId(personId)
    })
    if(!existingPerson){
      responseProperties.statusCode=404;
      throw new Error(`RECORD WITH ID ${personId} NOT FOUND`);
    }

    //turn on validations for update
    const personUpdateResult = await EntryModel.updateOne({
      _id: dbUtils.getObjectId(personId)
    },
    updateProperties,{
      runValidators: true
    });

    responseProperties.statusCode = 200;
    responseProperties.body = {
      message: "RECORD UPDATED",
      person: DATA.persons[personId]
    }

  }catch(e){
    console.error(`PERSONS|POST|ERROR`,e);
    responseProperties.statusCode = responseProperties.statusCode<400 ? 500 : responseProperties.statusCode;
    responseProperties.err = e;
  }

  if(responseProperties.err){
    responseProperties.httpStatusCode = responseProperties.statusCode;
    next(responseProperties);
  } else {
    res.status(responseProperties.statusCode).send(responseProperties.body);
  }(errObj,req,res,next) => {

    const additionalProperties = errObj.additionalProperties || {};
  
    console.log("Handling error...");
  
    res.status(errObj.httpStatusCode || 500).send({
      message: errObj.err && errObj.err.message ? errObj.err.message : "INTERNAL SERVER ERROR",
      ...additionalProperties
    })
  
  }

  
  })();

  

})

app.get('/info',(req,res,next) => {
  // console.log(req.timestamp);

  (async() => {

    const entriesCount = await EntryModel.countDocuments({});
    res.render('info',{
      title: "Info",
      entryCount: entriesCount,
      timeString: (new Date(req.timestamp)).toISOString()
    });
  })();

  

})


app.use(handleErrors);




app.listen(CONFIG.port, () => {
	console.log(`SERVER LISTENING ON PORT ${CONFIG.port}`);
})

