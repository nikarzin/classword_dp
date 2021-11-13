const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const { MemberService } = require('./service')

class Member {
    static index = async (req, res) => {
        try {
            let result = await MemberService.getAll();
            return res.status(StatusCodes.OK).json({ message: 'success', data: result });
        }
        catch (error) {
            throw error;
        }
    }
    static show = async (req, res) => {
        try {
            let { id } = req.params;
            let result = await MemberService.getById(id);
            return res.status(StatusCodes.OK).json({ message: 'success', data: result });
        }
        catch (error) {
            throw error;
        }
    }
    static create = (req, res) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let { first_name, last_name, username, email, date_of_birth } = req.body;
            let result = MemberService.insert(first_name, last_name, username, email, date_of_birth);
            return res.status(StatusCodes.CREATED).json({ message: result });
        }
        catch (error) {
            throw error;
        }
    }

    static update = (req, res) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }

            let { id } = req.params;
            let { first_name, last_name, username, email, date_of_birth } = req.body;
            if (!date_of_birth) date_of_birth = "";
            let result = MemberService.update(id, first_name, last_name, username, email, date_of_birth);
            res.status(StatusCodes.OK).json({ message: result });
        }
        catch (error) {
            throw error;
        }
    }
    static destroy =(req, res) => {
        try {
            let { id } = req.params;
            let result = MemberService.destroy(id);
            return res.status(StatusCodes.OK).json({ message: result });
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = { Member }