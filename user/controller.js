const { connection } = require('../database/connection');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

class User {
    // login user
    static login = (req, res) => {

    }

    // Get all
    static index = (req, res) => {

    }

    // Get auth user
    static auth = (req, res) => {

    }

    // Get by :id
    static show = async (req, res) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('select * from `users` where id=?', [req.params.id], function (error, results, fields) {
                if (error) return reject(error);
                console.log("Line 2")
                console.table(results);

                resolve(results)
            });
        });

        console.log("Line 4")
        let result = await userData;
        console.log(result)
        console.log("Line 5")

        delete result[0].password;

        console.log("Line 3")

        return res.status(StatusCodes.OK).json({ message: 'success', data: result });
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