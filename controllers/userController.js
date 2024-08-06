import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'; // For future use, e.g., for authentication

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists, please log in." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
        });

        // Save user to the database
        await newUser.save();

        // Print verification token (for testing purposes)
        console.log(`Verification token: ${verificationToken}`);

        // Respond to client
        res.status(201).json({ message: "User registered successfully." });

    } catch (error) {
        console.error('Error in RegisterUser:', error.message);
        res.status(500).send('Server error');
    }
};

const LoginUser = async (req,res) => {
    // in elements we will take these elements // 
    const {email,password} = req.body

    // check if user exists // 


    try{
        let user = await User.findOne({email})

        // if the user does not exist // 

        if(!user){
            return res.status(400).json({message:"User does not exist , please register first"})
        }

        // if he doess // 
        // hash the password // 

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json(400).json({message:"invalid email or password , please try again"})
        }
        // if it does generate jwt token for the use  // 

        const token = await jwt.sign({userId = user._id}, process.env.JWT_SECRET ,{expiresIn:'1h'})

        // json the token // 

        res.status(200).json(token)
    }catch(error){
        console.error(error.message)

        res.status(500).send('Server error')
    }
}

export default RegisterUser;
