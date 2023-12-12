const express=require("express");
const router=express.Router();
const {auth,isBuyer}=require("../middlewares/auth");
const {getAllSellers,getSellerCatalogDetails,createOrder}=require("../controllers/Buyer")



router.get("/list-of-sellers",auth,isBuyer,getAllSellers);

router.get("/seller-catalog/:seller_id",auth,isBuyer,getSellerCatalogDetails);
router.post("/create-order/:seller_id",auth,isBuyer,createOrder);

module.exports=router;