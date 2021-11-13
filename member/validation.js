const { body } = require('express-validator');
const {MemberService} = require('./service')
const create = [
    body('first_name').trim().isLength({ min: 4, max: 255 })
    .withMessage("Minimum lenght is 4,maximum lenght is 255 characters")
    .notEmpty().withMessage("This field is required"),

body('last_name').trim().isLength({ min: 4, max: 255 }).withMessage("Minimum lenght is 4,maximum lenght is 255 characters")
    .notEmpty().withMessage("This field is required"),

body('username').trim().isLength({ min: 3, max: 100 }).withMessage("Minimum lenght is 3,maximum lenght is 100 characters")
    .notEmpty().withMessage("This field is required")
    .custom(async (value) => {
        let data = await MemberService.getByUsername(value);
        if (data.length) {
            return Promise.reject('Username already in use');
        }

        return true;
    }),
body('email').trim().isEmail().withMessage("This field is for email")
    .isLength({ max: 100 }).withMessage("Maximum lenght is 100 characters").notEmpty().withMessage("Name field is required")
    .custom(async (value) => {
        let data = await MemberService.getByEmail(value);
        if (data.length) {
            return Promise.reject('Email already in use');
        }

        return true;
    }),
body("date_of_birth").isAfter("1900-01-01").withMessage("Minimum age is 1900-01-01")
    .isBefore("2000-01-01").withMessage("Maximum age is 2000-01-01")
];
const update = [
    body('first_name').trim().isLength({ min: 4, max: 255 })
    .withMessage("Minimum lenght is 4,maximum lenght is 255 characters")
    .notEmpty().withMessage("This field is required"),

body('last_name').trim().isLength({ min: 4, max: 255 }).withMessage("Minimum lenght is 4,maximum lenght is 255 characters")
    .notEmpty().withMessage("This field is required"),

body('username').trim().isLength({ min: 3, max: 100 }).withMessage("Minimum lenght is 3,maximum lenght is 100 characters")
    .notEmpty().withMessage("This field is required")
    .custom(async (value) => {
        let data = await MemberService.getByUsername(value);
        if (data.length) {
            return Promise.reject('Username already in use');
        }

        return true;
    }),
body('email').trim().isEmail().withMessage("This field is for email")
    .isLength({ max: 100 }).withMessage("Maximum lenght is 100 characters").notEmpty().withMessage("Name field is required")
    .custom(async (value) => {
        let data = await MemberService.getByEmail(value);

        if (data.length) {
            return Promise.reject('Email already in use');
        }

        return true;
    }),
body("date_of_birth").isAfter("1900-01-01").withMessage("Minimum age is 1900-01-01")
    .isBefore("2000-01-01").withMessage("Maximum age is 2000-01-01")
];
module.exports = {
    create,
    update
}