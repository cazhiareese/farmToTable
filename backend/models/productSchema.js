/**
* Schema for products.
* Represents the structure of a product, including its name, description, type, stock quantity, price, image URL, and status.
*/

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
       name: {type: String, required: true},
       description: {type: String, required: true},
       type: {type: Number, required: true},
       stock: {type: Number, required: true},
       price: {type: Number, required: true},
       imageURL: {type: String, required: true},
       status: {type: Number, required: true}
}, {versionKey: false});

const Product = mongoose.model('Product', productSchema);

export { Product };