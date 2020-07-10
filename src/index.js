"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const DATA = require('../data.json');
const {
  logRequestTime
} = require('./middlewares/index.js')
// const {
//   getInfoPage
// } = require('./templates/index.js');
const handlebars = require('express-handlebars')

const CONFIG = {
	port: 3001
}


 

const app = express();


app.engine('hbs',handlebars({
  layoutsDir: `${__dirname}/templates/layouts`,
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(logRequestTime);




//Endpoint to get all person records - Exercise 3.1
app.get('/api/persons',(req,res,next) => {
	res.send(Object.keys(DATA.persons).reduce((personsArr,id) => {
    return personsArr.concat({
      id: parseInt(id),
      ...DATA.persons[id]
    });
  },[]));
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

