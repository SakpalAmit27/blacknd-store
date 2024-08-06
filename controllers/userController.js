import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'; // For future use, e.g., for authentication

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;

    // checking missing input fields // 

    if(!name || !email || !password){
        return res.status(400).json({message:"please provide required fields"})
    }


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

export default RegisterUser;
