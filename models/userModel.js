// creating the user model // 

import mongoose from "mongoose";

import validator from "validator";

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:validator.isEmail,
            message:"Please Enter an Valid email",
            isAsync:false
        }
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    // checking the user verified with {token}
    isVerified:{
        type:Boolean,
        default:false
    },
    //applying token to every id // 
    VerificationToken:{
        type:String,
        default:null
    }

},{
    timestamps:true
})

const User = mongoose.model('User',UserSchema);

// exporting model for global use // 
export default User;