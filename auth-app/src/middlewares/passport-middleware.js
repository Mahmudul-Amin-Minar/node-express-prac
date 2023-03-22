import passport from "passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

import { SECRET as secretOrKey } from "../constants";
import { User } from "../models";

const option = {
    secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(option, async({ id }, done) => {
        try{
            let user = await User.findById(id);
            if(!user){
                throw new Error('User not found');
            }
            return done(null, user.getUserInfo());
        }catch{
            done(null, false);
        }
    })
);