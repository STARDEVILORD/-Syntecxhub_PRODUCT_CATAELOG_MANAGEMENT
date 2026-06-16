const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    
    category: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);