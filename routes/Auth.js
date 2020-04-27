const express = require('express')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const router = express.Router()
const Users = require('../models/Users')

const registerSchema = joi.object({
    firstName: joi.string()
        .min()
        .required(),
    lastName: joi.string()
        .min(2)
        .required(),
    email: joi.string()
        .min(6)
        .email()
        .required(),
    password: joi.string()
        .min(8)
        .required()
})

router.post('/register', async (req, res) => {

    
})

module.exports = router;