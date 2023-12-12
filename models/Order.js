const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
     buyer_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
     },
     seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
     },
     products:[
        {
        
        
        product_id: {

              type :String,
               required:true,
              
         },
         quantity:{
            type:Number,
            default:1
         }
        }
     ]
,
 status: {
   type: String,
   enum: ["confirmed", "delivered"],
   default:"confirmed"
 }

 })

 module.exports = mongoose.model("Order", orderSchema);