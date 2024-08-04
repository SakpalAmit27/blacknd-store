// controller to handle user request eg : login and signup .// 

// ex / 

import express from 'express'

// adding our user model here // s

import User from '../models/userModel'

// router for routing // 
const router = express.Router();

// bcrypt for hashing // 

import bcrypt from 'bcrypt'


import crypto from 'crypto'
// json web token .. 

import jwt from 'jsonwebtoken'

// 1 : async function to register the user .. 

const RegisterUser = async (req,res) => {
    // essentials // 

    const {name,email,password} = req.body;

    try{
        // finding the user email if he exists already// 


        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"user already exists , please login"})
        }

        // if he doesnt exist // 

        // hashing the password .. 

        const hashedPassword = await bcrypt.hash(password,10);

        const verificationToken = crypto.randomBytes(32).toString('hex')

        // now create the new user /

        user = new User ({
            name,
            email,
            password:hashedPassword,
            verificationToken:verificationToken,
            isVerified:false
        })
        // saving the user // 

        await user.save()
        // printing the verification token after register // 

        console.log(`verification token : ${verificationToken}`)

        res.status(201).json({message:"user registered successfully"})


    }catch(error){
        console.error(error.message)
        res.status(500).send('Server error')
    }
}

export default RegisterUser;