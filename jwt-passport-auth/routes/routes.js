const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', {session:false}),
    async(req, res, next) => {
        res.json({
            message: "signup successful",
            user: req.user
        });
        next();
    }
)

router.post(
    '/login',
    async(req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try{
                    if(err || !user){
                        const error = new Error('An error occurred');
                        return next(error);
                    }
                    req.login(
                        user,
                        {session:false},
                        async (error) => {
                            if(error) return error;
                            const body = {_id: user._id, email: user.email};
                            const token = jwt.sign({user:body}, 'TOP_SECRET');
                            return res.json({token});
                        }
                    );
                }catch(error){
                    return next(error);
                }
            }
        )(req, res, next);
    }
);


module.exports = router;