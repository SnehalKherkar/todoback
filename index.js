const express = require("express")
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 9999;
const cors = require("cors")
const bodyParser = require("body-parser")
const {connectMongoDB} = require("./connection")
const userRouter =require("./routes/user")
const todoRouter = require("./routes/todo");

/////  YZ471yYnKsRKCAdJ  other password 
//// s9j2SilCu8Qus6Th
connectMongoDB("mongodb+srv://snehalkherkar06:s9j2SilCu8Qus6Th@todolist.gmtg6hc.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB connect Succesfully")
}).catch((err)=>{
    console.log("Error",err)
})


app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    // other CORS options...
}));
app.use(express.json());



app.use("/user",userRouter);
app.use("/todos",todoRouter);




app.listen(PORT, ()=>{
    console.log(`Server is running on Port :-${PORT}`)
})