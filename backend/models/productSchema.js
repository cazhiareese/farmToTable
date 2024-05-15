import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
       name: {type: String, required: true},
       description: {type: String, required: true},
       type: {type: Number, required: true},
       stock: {type: Number, required: true},
       price: {type: Number, required: true},
       imageURL: {type: String, required: true},
});

const Product = mongoose.model('Product', productSchema);

export { Product };