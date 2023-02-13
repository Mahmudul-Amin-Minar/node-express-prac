import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePasswords = (password, hashed_pass) => {
    return bcrypt.compare(password, hashed_pass);
}

export const hashedPass = (password) => {
    return bcrypt.hash(password, 5); 
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id, 
        username: user.username
    }, process.env.JWT_SECRET_KEY);
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401)
        res.json({message: 'not authorized'});
        return
    }
    const [, token] = bearer.split(' ');
    if(!token){
        res.status(401)
        res.json({message: 'not valid token'});
        return
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    }catch(e){
        console.error(e);
        res.status(401);
        res.json({message: 'not valid token'});
        return
    }
}