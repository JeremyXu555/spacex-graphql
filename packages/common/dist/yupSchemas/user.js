"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.emailNotLongEnough = "email must be at least 3 characters";
exports.passwordNotLongEnough = "password must be at least 3 characters";
exports.invalidEmail = "email must be a valid email";
exports.registerPasswordValidation = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .required()
        .max(10, 'Your fist name is too long')
        .min(3, 'Your first name is too short haha'),
    lastName: yup
        .string()
        .required()
        .min(3, 'Nope! your last name must be longer than 3 characters')
        .required(),
    password: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map