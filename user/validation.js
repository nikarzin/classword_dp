const { body } = require('express-validator');
const { UserService } = require('./service');

const create = [
    body('name')
        .notEmpty().withMessage('Field is required')
        .isLength({ min: 3 }).withMessage('Min lenght is 3 character'),
    body('gender').isIn(['male', 'female', '']),
    body('dob').notEmpty().isDate()
];
const update = [
    body('name').notEmpty().withMessage('Field is required')
        .isLength({ min: 3 }).withMessage('Min lenght is 3 character'),
    body('gender').isEmpty().isIn(['male', 'female', '']),
    body('dob').notEmpty().isDate()
];
const signin = [
    body('username').notEmpty().withMessage("Username Field is required"),
    body("password").notEmpty().withMessage("Password field is required"),
    body("username").custom(async (value) => {
        let data = await UserService.getByUsername(value);

        if (data.hasOwnProperty("id")) {
            return true;
        }
        return Promise.reject('Username or password is invalid');
    })
]
module.exports = {
    create,
    update,
    signin
}