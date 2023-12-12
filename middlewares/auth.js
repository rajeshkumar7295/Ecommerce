
const Jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
     const token=req.cookies.token || req.header("Authorization").replace("Bearer ", "");

     console.log("token in auth file ",token)

     
     if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing."
        })
    }
    try {
      console.log("before decode");
      const decode=Jwt.verify(token,process.env.JWT_SECRET);
      req.user=decode;
      console.log("decode...", decode);
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Token is invalid."
        })
    }

    next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating  the token."
        })
    }
}

exports.isBuyer=async (req,res,next)=>{
    try {
        if(req.user.user_type!=="Buyer"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Buyer only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not verified. Please try again."
        })
    }
}

exports.isSeller=async(req,res,next)=>{
    try {
        console.log("req ka data"+ req.user.user_type )
        if (req.user.user_type !== "Seller") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Seller only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not verified. Please try again."
        })
    }
}