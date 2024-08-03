import express from 'express'

const app = express();

const port = 3000 || process.env.PORT;


// basic get boilerplae  // 

app.get('/',(req,res) => {
    res.send('welcome to BLACKND')
})

// listenong the port // 

app.listen(port,(req,res) => {
    console.log(`port : ${port}`)
})
