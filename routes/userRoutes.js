import express from 'express'

// importing our controller // 
import RegisterUser from '../controllers/userController.js';
// login controller // 
import LoginUser from '../controllers/user_loginController.js';
const router = express.Router();

// creating the endpoint .. 

router.post('/register',RegisterUser);
router.post('/login',LoginUser)

export default router;
// export the router // 