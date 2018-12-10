module.exports = verifyRole

function verifyRole(req, res, next) {
    const credentials = JSON.parse(req.headers.credentials);
    console.log(verifyRole);
    console.log(credentials);
    console.log('if');
    if (credentials !== "admin") {
        console.log('entro al if');
        return res.status(403).send({
            credentials: false,
            message: 'Restricted Access.'
        });
    } else {
        console.log('entro al else');
        next();
    }
}