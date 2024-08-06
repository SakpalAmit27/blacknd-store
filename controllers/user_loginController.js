import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// login controller for user login .. 

const LoginUser = async (req,res) => {

    // needed elements // 

    const {email,password} = req.body;

    try{

        // check user with email .. / 


        let user = await User.findOne({email})

        // if he does not exist // 

        if(!user){
            return res.status(400).json({message:"User does not exist , please register first"})
        }

        // if he does / 
        // hash the password // 

        const isMatch = await bcrypt.compare(password,user.password)
        // if doesnt match // 

        if(!isMatch){
            return res.status(400).json({message:"invalid email or password, please try again"})
        }

        // if it does generate the jwt / 

        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET ,{expiresIn:'1h'})

        res.status(200).json({token})
    }catch(error){
        console.error(error.message)

        res.status(500).send('Server error')
    }
}

export default LoginUser;