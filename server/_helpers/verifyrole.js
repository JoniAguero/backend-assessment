module.exports = verifyRole

function verifyRole(req, res, next) {
    const credentials = JSON.parse(req.headers.credentials);
    console.log(verifyRole);
    if (credentials !== "admin") {
        return res.status(403).send({
            credentials: false,
            message: 'Restricted Access.'
        });
    } else {
        next();
    }
}