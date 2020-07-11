"use strict";

const CONFIG = {
	port: 3001,
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


const getNewId = () => {
  return String(Math.floor(Math.random()*1000000));
}



 

const app = express();


app.engine('hbs',handlebars({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(logRequestTime);




//Endpoint to get all person records - Exercise 3.1
app.get('/api/persons',(req,res,next) => {
	res.send(Object.keys(DATA.persons).reduce((personsArr,id) => {
    return personsArr.concat(DATA.persons[id]);
  },[]));
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

