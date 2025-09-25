import {ApiResponse} from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"



/**
 

 
const healthCheck = (req,res) => {
    try {
        res.status(200)
        .json(new ApiResponse(200,{ message: "Server is running"}));
        
    }catch(error){}
};
 */
//heathcheck using aysnc handler

const healthCheck = asyncHandler(async(req,res) => {
    res
    .status(200)
    .json(new ApiResponse(200, {message:"Server Is Running"}))
})

export {healthCheck};