import { check } from "express-validator";
const name = check('name', 'name is required').not().isEmpty();
const username = check('username', 'username is required').not().isEmpty();
const email = check('email', 'Please provide a valid email address').isEmail();
const password = check('password', 'password is required of min len 6').isLength({min: 6});

export const RegisterValidations = [password, name, username, email];
export const AuthenticateValidations = [username, password];
export const ResetPassword = [email];