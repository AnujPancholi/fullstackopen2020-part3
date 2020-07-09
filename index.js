"use strict";

const express = require("express");
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({
	extended: true
}));

const CONFIG = {
	port: 3001
}

const DATA ={
  "persons": [
    {
      "name": "Arto Hellas",
      "phoneNumber": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "phoneNumber": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "phoneNumber": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "phoneNumber": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Khadak Singh",
      "phoneNumber": "99969696",
      "id": 6
    }
  ]
}



app.get('/api/persons',(req,res,next) => {
	res.send(DATA.persons);
})


app.listen(CONFIG.port, () => {
	console.log(`SERVER LISTENING ON PORT ${CONFIG.port}`);
})

