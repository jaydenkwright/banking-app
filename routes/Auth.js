const express = require('express')
const router = express.Router()
const Users = require('../models/Users')

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log('test')
})

module.exports = router;