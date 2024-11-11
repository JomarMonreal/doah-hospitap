import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

await mongoose.connect(process.env.MONGO_STRING , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('App connected to database');
    app.listen(3000,() => console.log("Server is now running at port 3000..."));
  })
  .catch((error) => {
    console.log(error);
  });