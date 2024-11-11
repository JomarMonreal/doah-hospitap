import mongoose from "mongoose"

export const userModel = mongoose.model('users',{
    name: String,
    bday: String,   // in UTC format
    gender: String,
    email: String,
    password: String
});