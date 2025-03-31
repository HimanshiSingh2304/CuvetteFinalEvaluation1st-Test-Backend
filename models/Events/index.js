import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true
    },
    eventTopic:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    hostName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    dateAndTime:{
        type:Date,
        required:true
        
    },
    duration:{
        type:Number
    }
},{timestamps: true})

export default eventSchema