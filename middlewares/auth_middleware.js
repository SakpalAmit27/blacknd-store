
import jwt from 'jsonwebtoken'

// importing our user model // 

import User from '../models/userModel'

const authMiddleware = async (req,res,next) => {

    const token = req.header('Authorization').replace('Bearer ','')

    if(!token){
        res.status(401).json({message:"no token , authorization denied"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.userId
        next();
    }catch(error){
        console.error(error.message)
        res.status(400).json({message:"token is not valid"})
    }
}

export default authMiddleware;