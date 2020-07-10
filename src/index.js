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


const updateDateFile = () => {
  return new Promise((resolve,reject) => {
    fs.writeFile(JSON.stringify(DATA),(err) => {
      if(err){
        reject(err);
      } else {
        resolve(true);
      }
    })
  })
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

