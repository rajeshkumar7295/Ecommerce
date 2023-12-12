const User = require("../models/User");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
exports.getAllSellers = async (req, res) => {
    try {
        const allSellers = await User.find({ user_type: "Seller" });
        res.status(200).json({
            success: true,
            sellers: allSellers,
            message: "all list of seller"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

exports.getSellerCatalogDetails = async (req, res) => {
    try {
        
        const seller_id = req.params.seller_id.trim().replace(/[^a-fA-F0-9]/g, '');
        console.log("Cleaned seller_id:", seller_id);

        const catalog = await Catalog.findOne({ seller_id: seller_id });
        console.log("catalog....",catalog)
        if (!catalog) {
            return res.status(404).json({
                success: false,
                error: "Catalog not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: catalog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message
        });
    }
}

exports.createOrder = async (req, res) => {
    try {
        const seller_id = req.params.seller_id;
        console.log("111",seller_id);
       const seller=await User.findOne({_id:seller_id});
       console.log("seller",seller);
       if(!seller){
        return res.statas(404).json({
            success:false,
            message:"Seller not found"
        }
        )
       }
        const user_id = req.user.id;

        const { product_id } = req.body;
        console.log('product_id',product_id);

        // Ensure product_id is an array
        if (!Array.isArray(product_id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid product_id format. Expected an array."
            });
        }
      // Create the order with an array of products
      const newOrder = await Order.create({
        buyer_id: user_id,
        seller_id: seller_id,
        products: product_id.map(id => ({ product_id: id }))
    });

         // Obtain the generated orderid
         const orderid = newOrder._id;

         // Find the user and update orderHistory
         const user = await User.findById(user_id);
         if (!user) {
             return res.status(404).json({
                 success: false,
                 error: "User not found"
             });
         }
 
         // Push the orderid to order array
         user.order.push(orderid);
 
         // Save the updated user document
         await user.save();
        res.status(200).json({
            success: true,
            data: newOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}