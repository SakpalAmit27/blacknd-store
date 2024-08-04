import express from 'express'

// importing our controller // 
import RegisterUser from '../controllers/userController'

const router = express.Router();

// creating the endpoint .. 

router.post('/register',RegisterUser);

export default router;
// export the router // 