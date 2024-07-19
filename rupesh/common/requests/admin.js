const { body, query, check, param } = require('express-validator')

const loginValidation = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim()
]

module.exports ={
    loginValidation
}