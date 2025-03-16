import express from "express";
import mongoose from 'mongoose';
import userRouter from '../api_users/router.js'
import appointmentRouter from '../api_appointments/router.js';
import cors from 'cors';
import messageRouter from '../api_messages/router.js';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

//express app
const app = express();


app.use(cors());
// middleware
app.use(express.json())

//routes
app.use('/api/user', userRouter)
app.use('/api/appointments',appointmentRouter)
app.use('/api/messages',messageRouter)

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