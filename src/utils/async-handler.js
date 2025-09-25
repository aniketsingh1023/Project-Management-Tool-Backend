//==================================================================
//NoTe : This Is A Higher Order Function 
// Using This Standardises The Functions and we dont have to wrtie separate try-catch async and structure each of our functions instead we use this utility
//==================================================================
const asyncHandler = (requestHandler) => {
    return (req , res, next) => {
        Promise 
        .resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}
export {asyncHandler}