import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import { asyncError } from "../utils/async-error.js"


const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists",[])
        
    }
});