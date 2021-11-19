const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require('../database/connection');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const { UserService } = require('./service');


class User {
    // login user
    static login = async (req, res) => {
        let { email, password } = req.body;

        let user = await UserService.getByEmail(email);

        if (user.hasOwnProperty('id')) {
            let isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                let { JWT_SECRET } = process.env;
                let token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(StatusCodes.OK).json({
                    code: StatusCodes.OK,
                    data: {
                        token,
                        expireIn: 3600
                    }
                })
            }
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            code: StatusCodes.UNAUTHORIZED,
            message: "Invalid login or password"
        })
    }

    // Get all
    static index = (req, res) => {

    }

    // Get auth user
    static auth = (req, res) => {

    }

    // Get by :id
    static show = async (req, res) => {
        return res.status(StatusCodes.OK).json({
            message: 'success',
            data: await UserService.getByID(req.params.id)
        });
    }

    // Create a new user
    static create = async function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const passwordHash = bcrypt.hashSync(req.body.password, 5)

        try {
            let data = new Promise((resolve, reject) => {
                connection.query('INSERT INTO `users` (`name`, `email`, `password`, `gender`, `dob`) VALUES (?,?,?,?,?)', [req.body.name, req.body.email, passwordHash, req.body.gender, req.body.dob], function (error, results, fields) {
                    if (error) reject(error);

                    console.table(results);
                    return resolve(results)
                });
            });

            let results = await data;

            return res.status(201).json({ message: 'success', data: { id: results.insertId } });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'error', data: error });
        }
    }

    // Update user by :id
    static update = function (req, res) {
        // Create a new user
    }

    // Delete user by :id
    static destroy = function (req, res) {
        // Create a new user
    }
}

module.exports = { User }