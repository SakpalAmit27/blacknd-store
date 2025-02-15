// BOILER PLATE // 

import mongoose from "mongoose"


const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI) 
    console.log(`connected to db`)
    }
    catch(error){
        console.error(`error connecting to db : ${error.message}`)
        process.exit()
    }

}

export default connectDB;