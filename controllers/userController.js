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


        let user = User.findOne({email});

        if(user){
            return res.status(400).json({message:"user already exists , please login"})
        }

        // if he doesnt exist // 

        // hashing the password .. 

        const hashedPassword = await bcrypt.hash(password,10);



    }
}