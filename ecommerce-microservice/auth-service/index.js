const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./user')

const app = express();
const PORT = process.env.PORT_ONE || 7070;
app.use(express.json());
// mongodb://localhost:27017


mongoose.connect("mongodb://127.0.0.1:27017/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Auth-Service DB connected`);
    }
})


// Register 
app.post('/auth/register', async(req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        res.json({
            message: "user already exist"
        })
    }else{
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save();
        res.json(newUser);
    }
})

// Login
app.post('/auth/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({message: 'user does not exist'});
    }else{
        // check if the entered password is valid 
        if(password !== user.password){
            res.json({message: 'password incorrect'});
        }
        const payload = {
            email, 
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if(err){
                console.log(err);
            }else{
                res.json({token: token});
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
})