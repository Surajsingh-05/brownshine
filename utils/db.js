const mongoose = require("mongoose");




const URI = process.env.MONGODB_URI;



const connectdb = async () => {
     try {
        await mongoose.connect(URI)
        console.log("connect db")
     } catch (error) {

        console.log("not connect db");
        process.exit(0);
        
     }
}


module.exports = connectdb;