const express = require('express')
const router = express.Router()
const { loginRequired } = require('../config/JWT');

router.get('/', (req, res) => {
    res.render()
})