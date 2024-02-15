const mongoose = require("mongoose")

async function  connectMongoDB(Url) {
    return mongoose.connect(Url)
    
}
 module.exports = {connectMongoDB}