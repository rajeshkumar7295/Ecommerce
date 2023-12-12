const  mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type :String,
        required:true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ["Buyer", "Seller"],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    token: {
        type: String,

    },
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
   
})

module.exports = mongoose.model("User", userSchema);