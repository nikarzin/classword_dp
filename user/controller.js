const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const { UserService } = require('./service');

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
        let user = await UserService.getByUsername(req.ody.username);
        let isMatch = await bcrypt.compareSync(req.body.password, user.password);
        if (isMatch) {
            let { PRIVATE_KEY } = process.env;
            let token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: '1h' });
            return res.status(StatusCodes.OK).json({
                code: StatusCodes.OK,
                data: {
                    token,
                    expiresIn: 3600
                }
            });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json(
            {
                code: StatusCodes.UNAUTHORIZED,
                message: "Invalid username or password"
            });
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