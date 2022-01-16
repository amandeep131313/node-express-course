// require('./db/connect')
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
require('dotenv').config();
// middleware

app.use(express.static('./public'))
app.use(express.json());

// app.get('/hello',(req,res)=>{
//     res.send('Task Manager App')
// })

app.use('/api/v1/tasks',tasks);
app.use(notFound)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000;
// PORT = 6000 node app.js
const start = async ()=>{
    try{
       await connectDB(process.env.MONGO_URI);
       app.listen(port, ()=>{
        console.log(`port is listening on port ${port}`)
        })
    }catch(e){
        console.log('error',e)
    }
}

start();