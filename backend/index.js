import 'dotenv/config'
import express from "express";
import mongoose from 'mongoose';
import userRouter from './api_users/router.js'
import appointmentRouter from './api_appointments/router.js';

//express app
const app = express();

// middleware
app.use(express.json())

//routes
app.use('/api/user', userRouter)
app.use('/api/appointments',appointmentRouter)

// listen for requests
// connect to db
mongoose.connect(process.env.MONGO_STRING)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 