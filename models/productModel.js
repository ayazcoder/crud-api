const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:[true, "Please enter a product name"],
        
        },
        jobPosition:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            required: true,
        },
        contactNumber:{
            type:String,
            required: true,
        },
        country:{
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)
const Product = mongoose.model("Product", productSchema);
module.exports =Product;