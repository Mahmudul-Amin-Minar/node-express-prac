import { randomBytes } from 'crypto';
import { Router } from "express";
import { join } from 'path';

import { DOMAIN } from '../constants';
import sendMail from '../functions/email-sender';
import { userAuth } from '../middlewares/auth-guard';
import validationMiddleware from "../middlewares/validator-middleware";
import { User } from "../models";
import { AuthenticateValidations, RegisterValidations, ResetPassword } from "../validators";

const router = Router();

/**
 * @description: to create a new user
 * @access: public
 * @api: user/api/register
 * @type: post
 */

router.post(
    '/api/register', 
    RegisterValidations, 
    validationMiddleware, async(req, res) => {
        try{
            let { username, email } = req.body;
            // check if the username is taken or not 
            let user = await User.findOne({ username: username });
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "Username is already taken",
                });
            }
            // check if the user exist with that email 
            user = await User.findOne({ email: email });
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "email is already registered",
                });
            }

            user = new User({
                ...req.body,
                verificationCode: randomBytes(20).toString('hex'),
            });
            let result = await user.save();
            // send the email to the sendgrid 
            let html = `
                <h1>Hello, ${user.username} </h1>
                <p>Please click the following link to verify your account </p>
                <a href="${DOMAIN}users/verify-now/${user.verificationCode}">Verify Now </a>
            `
            await sendMail(user.email, "verify account", "Please verifu your account", html);
            return res.status(201).json({
                success:true,
                message: "account created. verify email"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'an error occurred',
            })
        }
    }
);

/**
 * @description: to verify a new user via email
 * @access: public <only via email>
 * @api: user/verify-now/:verificationcode
 * @type: get
 */
router.get('/verify-now/:verificationCode', async(req, res) => {
    try{
        let { verificationCode } = req.params;
        let user = await User.findOne({ verificationCode });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }
        user.verified = true;
        user.verificationCode = undefined;
        await user.save();
        return res.sendFile(join(__dirname, '../templates/verification.success.html'));
    }catch{
        return res.sendFile(join(__dirname, '../templates/errors.html'));
    }
});

/**
 * @description: to authenticate and get auth token
 * @access: public
 * @api: user/api/authenticate
 * @type: post
 */

router.post(
    '/api/authenticate', 
    AuthenticateValidations, 
    validationMiddleware,
    async (req, res) => {
        try{
            let { username, password } = req.body;
            console.log(username, password);
            let user = await User.findOne({ username });
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Username or pass not found"
                })
            }
            if(!(await user.comparePassword(password))){
                return res.status(401).json({
                    success: false,
                    message: "Username or pass not found"
                })
            }
            let token = await user.generateJWT();
            return res.status(200).json({
                success: true,
                user: user.getUserInfo(),
                message: "you are now logged in",
                token: `Bearer ${token}`,
            })
        }catch{
            return res.status(500).json({
                success: false,
                message: 'an error occurred',
            })
        }
    }
)

/**
 * @description: to get the authenticated users profile
 * @access: private
 * @api: user/api/authenticate
 * @type: get
 */

router.get(
    '/api/authenticate',
    userAuth,
    async (req, res) => {
        return res.status(200).json({
            user: req.user,
        })
    }
)


/**
 * @description: to initial the password reset method
 * @access: public
 * @api: user/api/reset-password
 * @type: put
 */

router.put('/api/reset-password', ResetPassword, validationMiddleware,
    async (req, res) => {
        try{
            let {email} = req.body;
            let user = await User.findOne({email});
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User with this email is not found"
                })
            }
            user.generatePasswordReset();
            await user.save()
            // sent the password reset link in the email 
            let html = `
                <h1>Hello, ${user.username} </h1>
                <p>Please click the following link to reset your password </p>
                <p>If this password reset link is not created by you then ignore this mail</p>
                <a href="${DOMAIN}user/reset-password-now/${user.resetPasswordToken}">Reset Now </a>
            `
            sendMail(user.email, "Reset Password", "Please reset your password", html);
            return res.status(404).json({
                success: true,
                message: "Password reset link is sent to your email"
            })
        }catch{
            return res.status(500).json({
                success: false,
                message: "an error occurred"
            })
        }
    }
)


/**
 * @description: to get the authenticated users profile
 * @access: private
 * @api: user/reset-password/:resetPasswordToken
 * @type: get
 */

router.get('/reset-password-now/:resetPasswordToken', async(req, res) => {
    try{
        let { resetPasswordToken } = req.params
        let user = await User.findOne({resetPasswordToken, resetPasswordExpiresIn: { $gt:Date.now() }});
        if(!user){
            return res.status(401).json({
                message: "Password reset token is invalid or expired"
            })
        }
        return res.sendFile(join(__dirname, '../templates/password-reset.html'));
    }catch(err){
        return res.sendFile(join(__dirname, "../templates/errors.html"));
    }
})

/**
 * @description: to initial the password reset method
 * @access: public
 * @api: user/api/reset-password-now
 * @type: post
 */
router.post('/api/reset-password-now', async(req, res) => {
    try{
        let { resetPasswordToken, password } = req.body;
        let user = await User.findOne({resetPasswordToken, resetPasswordExpiresIn: { $gt:Date.now() }});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Password reset token is invalid or expired"
            })
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresIn = undefined;
        user.save();
        // send notification mail 
        let html = `
            <h1>Hello, ${user.username} </h1>
            <p>Your password resetted successful </p>
        `
        await sendMail(user.email, "reset password successful", "Your password has changed", html);
        return res.status(200).json({
            success: true,
            message: 'Your password request is complete',
        })
    }catch (err){
        return res.status(500).json({
            success: false,
            message: 'something went wromng',
        })
    }
})

export default router;