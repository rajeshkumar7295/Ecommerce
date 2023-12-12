const express=require("express");
const router=express.Router();
const {createCatalog,receivedOrders}=require("../controllers/Seller");
const {auth,isSeller}=require("../middlewares/auth");

router.post("/create-catalog",auth,isSeller,createCatalog);
router.get("/orders",auth,isSeller,receivedOrders);
module.exports=router