import {Router} from "express";
import {registerUser ,login} from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../vailidators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,login);

//Secure Routes
router.route("/logoutUser").post(verifyJWT,login);
export default router;

