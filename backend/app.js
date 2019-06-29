const express = require('express');
const cors = require('cors')
const bodyparser = require('body-parser');

//import { Promise } from 'es6-promise';
//import fetch from 'isomorphic-fetch';
//import axios from 'axios'
const axios = require('axios')

const event = require('./routes/Event');


const app = express();
app.use(cors());
app.use(bodyparser());

app.get('/', (req, res) => {
    res.send('Helllo World');
})

app.get('/example', (req, res) => {
    // res.send("hello world")
    console.log("gettig")
    axios.get('https://passwordwolf.com/api/?length=8&upper=off&lower=off&special=off&exclude=012345&repeat=5')
        .then(response => res.send(response.data))
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        })
})

app.use('/event', event)

app.listen('5000');