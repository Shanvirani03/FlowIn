const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const loginRequired = (res, res, next) => {
    const token = req.cookies['access_token']

    if (token) {
        const validToken =  jwt.verify(token, JWT_SECRET)
        if (validToken) {
            res.user = validToken.id
            next()
        }
        else {
            console.log('token expires')
        }
    }
    else {
        console.log('token not found')
    }
}


module.exports = { loginRequired }

