import mongoose from "mongoose"

export const Appointment = mongoose.model('appointments',{
    userId: String,
    date : String,  // in UTC fromat
    service: String,
    message: String,
    isDone: Boolean,
    prescription: [String]
});