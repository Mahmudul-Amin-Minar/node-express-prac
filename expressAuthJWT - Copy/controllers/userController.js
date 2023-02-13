const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const transporter = require('../config/emailConfig.js');
const UserModel =  require("../models/User.js");

class UserController {
    static userRegistration = async(req, res) => {
        const { email, password, password_conf } = req.body;
        const user = await UserModel.findOne({email:email});
        if(user){
            res.send({"status": "failed", "message": "Email already exists"});
        }else{
            if(email && password && password_conf){
                if(password === password_conf){
                    try{
                        const salt = await bcrypt.genSalt(12);
                        const hashedPass = await bcrypt.hash(password, salt);
                        const newUser = new UserModel({
                            email: email,
                            password: hashedPass,
                        })
                        await newUser.save();
                        // Generate JWT token 
                        const token = jwt.sign({
                            userID: newUser._id,
                        }, process.env.JWT_SECRET_KEY, {expiresIn:'5d'});

                        newUser.jwtToken = token;
                        await newUser.save();

                        res.status(201).send({"status": "success", "message": "Registration success", "token": token});
                    }catch(error){
                        console.log(error);
                        res.status(400).send({"status": "failed", "message": "unable to register"});
                    }
                }else{
                    res.status(400).send({"status": "failed", "message": "Password and confirm password doesn't match"});
                }
            }else{
                res.status(400).send({"status": "failed", "message": "All fields are require"});
            }
        }
    }

    static userLogin = async (req, res) => {
        try{
            const {email, password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email: email});
                if(user){
                    console.log(bcrypt.compare(password, user.password))
                    const isMatch = await bcrypt.compare(password, user.password);
                    if((user.email === email) && isMatch){
                        // Generate JWT token 
                        const token = jwt.sign({
                            userID: user._id,
                        }, process.env.JWT_SECRET_KEY, {expiresIn:'5d'});
                        user.jwtToken = token;
                        await user.save();
                        res.status(200).send({"status": "success", "message": "Login success", "token":token});
                    }else{
                        res.status(400).send({"status": "failed", "message": "email or password not matched"});
                    }
                }else{
                    res.status(400).send({"status": "failed", "message": "you are not registered user"});
                }
            }else{
                res.status(400).send({"status": "failed", "message": "All fields are require"});
            }
        }catch{
            console.log(error);
            res.status(400).send({"status": "failed", "message": "unable to login"});
        }
    }

    static userLogout = async (req, res) => {
        const user = req.user;
        user.jwtToken = " ";
        await user.save();
        res.status(200).send({"status": "success", "message": "Logged out"});
    }

    static changeUserPassword = async(req, res) => {
        const {password, password_conf} = req.body;
        if(password && password_conf){
            if(password !== password_conf){
                res.send({"status": "failed", "message": "Password and confirm password doesn't match"});
            }else{
                const salt = await bcrypt.genSalt(12);
                const newHashedPass = await bcrypt.hash(password, salt); 
                await UserModel.findByIdAndUpdate(req.user._id, {$set:{ password: newHashedPass }});
                res.status(200).send({"status": "success", "message": "Password changed successfully"});
            }
        }else{
            res.status(400).send({"status": "failed", "message": "All fields are required"});
        }
    }

    // profile of logged in user 
    static loggedUser = async (req, res) => {
        res.send({"user": req.user});
    }

    static sendUserPasswordResetEmail = async (req, res) => {
        const {email} = req.body;
        if(email){
            const user = await UserModel.findOne({email: email});
            if(user){
                const secret = user._id + process.env.JWT_SECRET_KEY;
                const token = jwt.sign({userID: user._id}, secret, {expiresIn: '15m'});
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log(link);
                // send email 
                console.log(user.email);
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "Test mail from nodemailer",
                    html: `<a href=${link}>Click here</a> to reset your password.`
                })
                res.status(200).send({"status": "success", "message": "An email has been sent to your mail", "info": info});
            }else{
                res.status(400).send({"status":"failed", "message":"email is not registered"});
            }
        }else{
            res.status(400).send({"status":"failed", "message":"email field is required"});
        }
    }

    static userPasswordReset = async (req, res) => {
        const { password, password_conf } = req.body;
        const { id, token } = req.params;
        const user = await UserModel.findById(id);
        const new_secret = user._id + process.env.JWT_SECRET_KEY;
        try{
            jwt.verify(token, new_secret);
            if(password && password_conf){
                if(password !== password_conf){
                    res.send({"status": "failed", "message": "password and confirm password doesn't match"});
                }else{
                    const salt = await bcrypt.genSalt(12);
                    const newHashedPass = await bcrypt.hash(password, salt);
                    await UserModel.findByIdAndUpdate(id, {$set:{ password: newHashedPass }});
                    res.send({"status": "success", "message": "password reset successful"});
                }
            }else{
                res.status(400).send({"status": "failed", "message": "all fields are required"});
            }
        }catch(error){
            console.log(error);
            res.status(400).send({"status": "failed", "message":"Invalid token"});
        }
    }
}

module.exports = UserController;