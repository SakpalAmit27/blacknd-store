import express from 'express'

const app = express();

const port = 3000 || process.env.PORT;

import dotenv from 'dotenv'
// importing our db // 

import connectDB from './config/db.js';

// basic get boilerplate  // 

dotenv.config()

// calling to connect the db / 
connectDB()

app.get('/',(req,res) => {
    res.send('welcome to BLACKND')
})

// listenong the port // 

app.listen(port,(req,res) => {
    console.log(`port : ${port}`)
})
