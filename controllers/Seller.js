const Catalog = require("../models/Catalog");
const Order=require("../models/Order");
exports.createCatalog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { products } = req.body;

        // Check if products array is provided
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products array is required." });
        }

        // Create a new catalog
        const newCatalog = new Catalog({
            seller_id: userId,
            products: products
        });

        // Save the new catalog to the database
        const savedCatalog = await newCatalog.save();

        res.status(201).json(savedCatalog); // Respond with the created catalog
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.receivedOrders=async(req,res)=>{
    try {
        const seller_id=req.user.id;
        console.log("seller_id",req.user)
        const confirmedOrders = await Order.find({
            seller_id: seller_id,
            status: "confirmed"
        })
        .populate("products.product_id", ["productName", "productPrice"]) // Assuming product_id is a reference to Product model
        .exec();

        res.status(200).json({
            success: true,
            data: confirmedOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}