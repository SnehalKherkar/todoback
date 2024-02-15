const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required : true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const URL = mongoose.model("user",userSchema)

module.exports = URL
