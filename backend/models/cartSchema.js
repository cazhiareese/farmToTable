/**
* Schema for user shopping cart.
* Represents the structure of the user's shopping cart, including the user ID and the items in the cart.
*/

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
       userId: {type: String, required: true},
       cart: {type: Array, default: []}
}, {versionKey: false});

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };