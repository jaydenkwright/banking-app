const express = require('express')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Users = require('../models/Users')


const registerSchema = joi.object({
    firstName: joi.string()
        .min(2)
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
        res.json(savedUser)
        console.log(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
    
})

const loginSchema = joi.object({
    email: joi.string()
        .required(),
    password: joi.string()
        .required()
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { error } = loginSchema.validate(req.body)
    if(error) return res.json({error: 'There was an error with your email or password'})

    const emailExist = await Users.findOne({ email: email})
    if(!emailExist) return res.json({ error: 'Email or password is incorrect' })

    const validPassword = await bcrypt.compare(password, emailExist.email)
    if(validPassword) return res.json({ error: 'Email or password is incorrect'})

    const token = jwt.sign({id: emailExist._id}, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })

    res.cookie('token', token, {
        httpOnly: true
    })
    res.header('login-token', token).json({ token: token })
})

router.post('/logout', async(req, res) => {
    try{
        res.clearCookie('token', { path: '/', httpOnly: true})
        res.json({message: "logged out"})
    }catch(err){
        res.json({message: 'There was an error'})
    }
})


module.exports = router;