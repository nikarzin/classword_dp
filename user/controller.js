const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const { UserService } = require('./service')
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

    // Create a new user
    static create = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        let result = UserService.insert(req.body.name, req.body.gender, req.body.dob);

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