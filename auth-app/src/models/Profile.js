import { Schema } from 'mongoose';

const ProfileSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    avatar: {
        type: String,
        required: false
    },
    social:{
        facebook:{
            type: String,
            required: false
        },
        twitter:{
            type: String,
            required: false
        },
        linkedIn:{
            type: String,
            required: false
        },
    }
}, {timestamps: true});

const Profile = model('profile', ProfileSchema);
export default Profile;