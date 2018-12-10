const config = require('../config.json')
const jwt = require('jsonwebtoken')

module.exports = verifyToken

function verifyToken(req, res, next) {
    console.log(verifyToken);
    const request = req.headers.authorization.split(' ')[1];
    const token = request.replace(/['"]+/g, '')
    if (!token) { 
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });     
    }
    const { secret } = config
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: err
            });
        }
        //req.username = decoded.username;
        console.log('Decode token: ', decoded)
        next();
    });
}