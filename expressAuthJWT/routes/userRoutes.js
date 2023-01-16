const express = require('express');

const UserController = require('../controllers/userController.js');
const checkUserAuth = require('../middlewares/auth-middleware.js');
const { RegistrationValidations, RegistrationValidationsHandler } = require('../middlewares/registration-validation.js');


const router = express.Router();

// Public Routes
router.post('/register', RegistrationValidations, RegistrationValidationsHandler, UserController.userRegistration);
router.post('/login', UserController.userLogin);
router.get('/logout', checkUserAuth, UserController.userLogout);
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token', UserController.userPasswordReset);

// Protected Routes
router.post('/change-password', checkUserAuth,  UserController.changeUserPassword);
router.get('/logged-user', checkUserAuth,  UserController.loggedUser);

module.exports = router;