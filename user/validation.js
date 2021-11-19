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
    body('name')
        .notEmpty().withMessage('Field is required')
        .isLength({ min: 3 }).withMessage('Min lenght is 3 character'),
    body('gender').isEmpty().isIn(['male', 'female', '']),
    body('dob').notEmpty().isDate()
];
const signin = [
    body('username').custom(async (value,{req}) => {
        let data = await UserService.getByUsername(value);

        if (data.length) {
            req.body.data = data;
            return true;
        }

        return Promise.reject('Username or password not found');
    }),
]
module.exports = {
    create,
    update,
    signin
}