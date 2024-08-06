// checking the user profile controller // 

// getting the user model // 

import User from "../models/userModel.js";

const getUserProfile = async (req,res) => {
    try{
        const userId = req.user.userId
        const user = await User.findById(userId).select('-password');

        if(!user) return res.status(404).json({message:"user not found"})

        res.status(200).json(user)
    }catch(error){
        console.error('error fetching the user profile',error.message);
        res.status(500).send('Server error')
    }
}

export default getUserProfile