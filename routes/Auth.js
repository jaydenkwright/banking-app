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
    const { firstName, lastName, email, password } = req.body

    const { error } = registerSchema.validate(req.body)
    if(error) return res.json({error: 'There was an error with your information'})

    const emailExist = await Users.findOne({ email: email})
    if(emailExist) return res.json({error: 'This email is already in use'})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
    
})

module.exports = router;