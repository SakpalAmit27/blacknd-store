// token verification / 

import jwt from 'jsonwebtoken'

const authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({message:'token expired'})

    // verify the token // 

    jwt.verify(token,process.env.JWT_SECRET , (err,user) => {
        if(err) return res.status(403).json({message:'invalid token'});

        req.user = user;
        next();
    })

}

export default authenticateToken;