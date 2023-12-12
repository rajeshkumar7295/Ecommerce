const express = require("express");
const router = express.Router();
const {auth}=require("../middlewares/auth")
const {updateProfile,updateDisplayPicture,deleteAccount}=require("../controllers/Profile");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
module.exports=router;