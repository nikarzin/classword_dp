const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

module.exports.auth = (req, res, next) => {
    const { authorization, accept } = req.headers;
    let errorMessage = [];

    if (!authorization) {
        errorMessage.push("Header Authorization is missing.")
    }

    if (authorization && !authorization.includes('Bearer ')) {
        errorMessage.push("Header Authorization Bearer value is missing.")
    }

    if (!accept) {
        errorMessage.push("Header Accept is missing.")
    }

    if (accept != 'application/json') {
        errorMessage.push("Header Accept parameter must be 'application/json'.")
    }

    if (errorMessage.length) {
        return res.status(StatusCodes.BAD_REQUEST).json({ code: StatusCodes.BAD_REQUEST, message: errorMessage })
    }

    let bearerToken = authorization.split(' ')[1];

    if (bearerToken) {
        try {
            let data = jwt.verify(bearerToken, process.env.JWT_SECRET);

            if (data && data.hasOwnProperty('id')) {
                return next()
            }
        } catch (e) {

        }
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ code: StatusCodes.UNAUTHORIZED, message: "UNAUTHORIZED" })
}