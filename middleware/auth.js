const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
let {UserService} = require('../user/service');
module.exports.auth = async (req, res, next) => {
    const { authorization, accept } = req.headers;
    let errorMessage = [];
    if (!authorization) {
        errorMessage.push("header authorisation is missing");
    }
    if (authorization && !authorization.includes("Bearer ")) {
        errorMessage.push("Token key must contain bearer");
    }
    if (!accept) {
        errorMessage.push("Header accept is missing");
    }
    if (accept != 'application/json') {
        errorMessage.push("header accepts only application/json");
    }
    if (errorMessage.length) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage });
    }
    let bearerToken = authorization.split(' ')[1];
    if (bearerToken) {
        try {
            let { PRIVATE_KEY } = process.env;
            let data = jwt.verify(bearerToken, PRIVATE_KEY);
            console.log(data);
            if (data && data.hasOwnProperty('id')) {
                let DBUser = await UserService.getByUsername(data.username);
                if(!DBUser.hasOwnProperty("id")){
                    return res.status(StatusCodes.BAD_REQUEST).json({message:"A User of given token not found"});
                }
                req.userId = data.id;
                return next();
            }
        }
        catch (error) { }
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ code: StatusCodes.UNAUTHORIZED, message: "UNAUTHORIZED" });
};