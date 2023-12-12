const express=require("express");
const router=express.Router();

const {signUp,login,sendOtp,changePassword}=require("../controllers/Auth");

const {auth}=require("../middlewares/auth");

router.post("/login",login);
router.post("/register",signUp);
router.post("/sendOtp",sendOtp);
router.post("/changePassword",auth,changePassword);



module.exports=router;