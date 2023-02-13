const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const UserModel = mongoose.model('user', UserSchema);

UserSchema.pre(
    'save',
    async function(next){
        const user = this;
        console.log(this.password);
        const hashedPass = await bcrypt.hash(this.password, 10);
        console.log(hashedPass);
        this.password = hashedPass;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = UserModel;