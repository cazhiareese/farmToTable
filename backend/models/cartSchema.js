import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
       userId: {type: String, required: true},
       cart: {type: Array, default: []}
});

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };