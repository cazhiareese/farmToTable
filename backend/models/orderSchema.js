import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
       productCheckedOut: {type: Array, required: true},
       customerId: {type: String, required: true},
       status: {type: Number, required: true},
       dateTime: {type: Date, default: Date.now},
       price: {type: Number, required: true},
}, {versionKey: false});

const Order = mongoose.model('Order', orderSchema);

export { Order };