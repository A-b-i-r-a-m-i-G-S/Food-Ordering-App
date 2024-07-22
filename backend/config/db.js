import mongoose from "mongoose"

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://admin:adminPassword@cluster0.vwywcsq.mongodb.net/Food-Ordering-App').then(()=>{
        console.log("DB Connected");
    })
}