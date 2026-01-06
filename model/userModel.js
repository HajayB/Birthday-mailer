const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,

    }, 
    email:{
        type:String,
        required:true,
        unique:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    lastSendYear:{
        type:Number,
        default:null,
    }
}, {timestamps:true});


module.exports = mongoose.model("User", userSchema);