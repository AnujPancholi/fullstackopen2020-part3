"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const DATA = require('../data.json');


const app = express();


app.use(bodyParser.json());

const CONFIG = {
	port: 3001
}



//Endpoint to get all person records - Exercise 3.1
app.get('/api/persons',(req,res,next) => {
	res.send(Object.keys(DATA.persons).reduce((personsArr,id) => {
    return personsArr.concat({
      id: parseInt(id),
      ...DATA.persons[id]
    });
  },[]));
})


app.listen(CONFIG.port, () => {
	console.log(`SERVER LISTENING ON PORT ${CONFIG.port}`);
})

