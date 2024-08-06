import express from 'express'

// importing our controller // 
import RegisterUser from '../controllers/userController.js';
// login controller // 
import LoginUser from '../controllers/user_loginController.js';

// import check // 

import { check } from 'express-validator';

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

export default router;
// export the router // 