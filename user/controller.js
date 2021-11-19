const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { UserService } = require('./service');
let jwt = require('jsonwebtoken');
require('dotenv').config();

let { PRIVATE_KEY } = process.env;
class User {
    // Get all
    static index = async (req, res) => {

        let result = await UserService.getAll();
        return res.status(StatusCodes.OK).json({ message: 'success', data: result });
    }
    // Get by :id
    static show = async (req, res) => {
        let result = await UserService.getByid(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'success', data: result });
    }

    //signin

    static signin = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        let user = req.body.data[0];

        let isMatch = await bcrypt.compareSync(req.body.password, user.password);
        if (isMatch) {
            let token = jwt.sign({ username: user.username, name: user.name, gender: user.gender, dob: user.dob, id: user.id }, PRIVATE_KEY);
            let verify = await jwt.verify(token, PRIVATE_KEY);

            return res.status(StatusCodes.OK).send({ "message": "Authorized sucesfully", "token": token });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send("Username or password is incorrect");
        }

    }
    static auth(req, res) {
       let token = req.headers.authorization.slice(7);
        //console.log(token);
        let verify = jwt.verify(token,PRIVATE_KEY);
        res.status(StatusCodes.OK).json(verify);
    }
    // Create a new user
    static create = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        let password = bcrypt.hashSync(req.body.password, 5);
        let result = UserService.insert(req.body.name, req.body.gender, req.body.dob, req.body.username, password);

        return res.status(StatusCodes.CREATED).json({ message: result });
    }

    // Update user by :id
    static update = function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        let result = UserService.update(req.params.id, req.body.name, req.body.gender, req.body.dob);
        return res.status(StatusCodes.OK).json({ message: result });
    }

    // Delete user by :id
    static destroy = async (req, res) => {
        let result = await UserService.destroy(req.params.id);
        return res.status(StatusCodes.OK).json({ message: 'success', data: result });
    }
}

module.exports = { User }