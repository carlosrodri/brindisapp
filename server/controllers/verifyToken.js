const jwt = require('jsonwebtoken')
const config = require('../config/config')

function verifyToken(req, res, next) {
    const token = req.headers['x-acces-token']
    
    if (!token) {
        return res.status(402).json({
            status: 'error',
            message: 'Debes iniciair sesión para realizar esta opcion'
        })
    } else {
        const decoded = jwt.verify(token, config.secret)
        req.userId = decoded.id
        next()
    }
}

module.exports = verifyToken