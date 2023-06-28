"use strict";
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
const express = require("express")
const app = express()



const { Config } = require("./src/config/index")
const routes = require('./routes/routes')

// create application/x-www-form-urlencoded parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));

// Use Cors
app.use(cors());
app.use(express.json());

app.use('/v1', routes)
app.get("*", (req, res) => res.status(404).send( { mns: 'Not Found - Unauthorized'}))


app.listen(Config.port, () => {
  console.log(`Servidor escuchando en el puerto  ${Config.port}`);
});
