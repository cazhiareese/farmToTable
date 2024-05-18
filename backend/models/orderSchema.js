import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
       productId: {type: String, required: true},
       customerId: {type: String, required: true},
       quantity: {type: Number, required: true},
       status: {type: Number, required: true},
       dateTime: {type: Date, default: Date.now},
       price: {type: Number, required: true},
}, {versionKey: false});

const Order = mongoose.model('Order', orderSchema);

export { Order };