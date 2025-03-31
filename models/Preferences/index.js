import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true 
        },
    username: {
        type: String, 
        required: true,
        unique:true
    },
    category:{
        type:String,
        enum:["Sales","Education","Finance","Government & Politics","Consulting","Recruiting","Tech","Marketing"],
        required:true
    }

})
export default preferenceSchema