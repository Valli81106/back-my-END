// ye code promises waala hai
const asyncHandler = (requestHandler) =>{
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err)).
        catch((err) => next(err))
    }
}


export {asyncHandler}


// ye code try catch waala tha
/*
const asyncHandler = (fn) => async(req,res,next) => {
    try{
        await fn(req,res,next)
    }catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
*/