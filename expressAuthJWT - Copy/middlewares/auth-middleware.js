const jwt =  require('jsonwebtoken');
const UserModel =  require('../models/User.js');

var checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try{
            // get token from header 
            token = authorization.split(' ')[1]

            // verify the token 
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            // Get user from token 
            req.user = await UserModel.findById(userID).select('-password');
            console.log(token);
            console.log(req.user);
            if(req.user.jwtToken === token){
                next();
            }else{
                res.status(401).send({ "status": "failed", "message": "You are not logged in" });
            }
            // next();
        }catch(error){
            console.log(error);
            res.status(401).send({ "status": "failed", "message": "UnauthoriZed user" });
        }
    }
    if(!token){
        res.status(401).send({ "status": "failed", "message": "UnauthoriZed user, no token" });
    }
}

module.exports = checkUserAuth;