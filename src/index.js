"use strict";


require("dotenv").config();
const Mongoose = require("mongoose");
Mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
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
  logRequestTime
} = require('./middlewares/index.js');
const handlebars = require('express-handlebars');
const morgan = require("morgan");
const cors = require('cors');

const EntryModel = require('./models/entry.js');


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
      res.status(500).send({
        message: e.message || "INTERNAL SERVER ERROR"
      })
    }
  })();
})


app.get(`/api/persons/:id`,async(req,res,next) => {

  if(DATA.persons.hasOwnProperty(req.params.id)){
    res.send(DATA.persons[req.params.id]);
  } else {
    res.status(404).send({
      message: `ID ${req.params.id} NOT FOUND`
    })
  }

})



app.delete("/api/persons/:id",(req,res,next) => {

    if(DATA.persons.hasOwnProperty(req.params.id)){
      delete DATA.persons[req.params.id];
      res.send({
        message: `ID ${req.params.id} DELETED`
      })
    } else {
      res.status(404).send({
        message: `ID ${req.params.id} NOT FOUND`
      })
    }
})


app.post('/api/persons',(req,res,next) => {

  const person = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }

  const responseProperties = {
    body: {},
    statusCode: 204
  }

  try{
    if(!person.name || !person.phoneNumber){
      responseProperties.statusCode=400;
      throw new Error("MANDATORY PARAM MISSING");
    }

    const existingNameSet = Object.keys(DATA.persons).reduce((nameSet,id) => {
    	nameSet.add(DATA.persons[id].name);
    	return nameSet
    },new Set());
    if(existingNameSet.has(person.name)){
    	responseProperties.statusCode=404;
    	throw new Error(`NAME ${person.name} ALREADY EXISTS`);
    }

    person.id = getNewId();

    DATA.persons[person.id] = person;

    responseProperties.body = {
      message: `NEW RECORD UPDATED`,
      person: person
    }
    responseProperties.statusCode = 200;

  }catch(e){
    console.error(`PERSONS|POST|ERROR`,e);
    responseProperties.statusCode = responseProperties.statusCode<400 ? 500 : responseProperties.statusCode;
    responseProperties.body = {
      message: e.message || `INTERNAL SERVER ERROR`
    }
  }

  res.status(responseProperties.statusCode).send(responseProperties.body);

})

app.put('/api/persons/:id',(req,res,next) => {

  const personId = req.params.id;

  const updateProperties = req.body;

  //in case a malicious request tries to change the id of the record
  delete updateProperties.id;

  const responseProperties = {
    body: {},
    statusCode: 204
  }

  try{
    const existingPerson = DATA.persons[req.params.id];
    if(!existingPerson){
      responseProperties.statusCode=404;
      throw new Error(`RECORD WITH ID ${personId} NOT FOUND`);
    }

    DATA.persons[personId] = {
      ...DATA.persons[personId],
      ...updateProperties
    }

    responseProperties.statusCode = 200;
    responseProperties.body = {
      message: "RECORD UPDATED",
      person: DATA.persons[personId]
    }

  }catch(e){
    console.error(`PERSONS|POST|ERROR`,e);
    responseProperties.statusCode = responseProperties.statusCode<400 ? 500 : responseProperties.statusCode;
    responseProperties.body = {
      message: e.message || `INTERNAL SERVER ERROR`
    }
  }

  res.status(responseProperties.statusCode).send(responseProperties.body);

})




app.get('/info',(req,res,next) => {
  // console.log(req.timestamp);

  res.render('info',{
    title: "Info",
    entryCount: Object.keys(DATA.persons).length,
    timeString: (new Date(req.timestamp)).toISOString()
  });

})


app.listen(CONFIG.port, () => {
	console.log(`SERVER LISTENING ON PORT ${CONFIG.port}`);
})

