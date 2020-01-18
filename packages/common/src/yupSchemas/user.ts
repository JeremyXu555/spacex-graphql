import * as yup from "yup";

export const emailNotLongEnough = "email must be at least 3 characters";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "email must be a valid email";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const userValidation = yup.object().shape({
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
  password: registerPasswordValidation
});
