import express from 'express'

// importing our controller // 
import RegisterUser from '../controllers/userController.js';
// login controller // 
import LoginUser from '../controllers/user_loginController.js';

// import check // 

import { check } from 'express-validator';
import authenticateToken from '../middlewares/auth_middleware.js';
import getUserProfile from '../controllers/user_profileController.js';

const router = express.Router();

// creating the endpoint .. 

router.post('/register',[
    check('name','name is required').not().isEmpty(),
    check('email','please include an valid email').isEmail(),
    check('password','password must be minimum 6').isLength({min : 6})
],
RegisterUser
);
router.post('/login',[
    check('email','please include an valid email').isEmail(),
    check('password','password must be minimum 6').isLength({min : 6})
],
LoginUser
)

router.get('/protected-route',authenticateToken, (req,res) => {
    res.status(200).json({message:'this is a protected route'})
})

router.get('/profile',authenticateToken,getUserProfile , (res) => {
    res.status(200).json({message:'done'})
})
export default router;
// export the router // 