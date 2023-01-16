const mongoose = require("mongoose");

// Defining Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    jwtToken :{
        type: String
    },
})

// Model 
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;