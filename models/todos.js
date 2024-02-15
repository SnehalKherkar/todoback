const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref :"user",
        required :true
    },
    task:{
        type:String,
        required:true
    },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;