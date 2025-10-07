import {body} from "express-validator";
//remember the syntax for every validator --> will be the same only 
const userRegisterValidator = () => {
    return [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Email is Invalid"),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username cannot required")
        .toLowerCase()
        .withMessage("Username must be lowercase")
        .isLength({min:6})
        .withMessage("Username must be atleast 6 characters long"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
    body("fullName")
        .optional()
        .trim()
    ]
}
const userLoginValidator = () => {
    return [
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email is Invalid"),
    body("password")
        .notEmpty()
        .withMessage("Password is Required")

    ];
};

export {userRegisterValidator,userLoginValidator}