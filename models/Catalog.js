const mongoose=require("mongoose");

const catalogSchema=new mongoose.Schema({
    seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[
        {
        productName:{
            type:String,
            required:true
            
          } ,
          productPrice:{
            type:Number,
            required:true
          },
          quantity:{
            type:Number,
            default:1
          }
        }
    ]
})

module.exports=mongoose.model("Catalog",catalogSchema);