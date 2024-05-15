import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
import {Cart} from '../models/cartSchema.js'
await mongoose.connect( 'mongodb+srv://cazhia:E13UKHwTNcHF3PzJ@farm.kzqurki.mongodb.net/ftt?retryWrites=true&w=majority&appName=farm', {  
 useNewUrlParser: true, useUnifiedTopology: true });

 
// Retrieve a products by their ID
const getProduct = async(req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    const product = await Product.findById(id);
    if (!product) {
      
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(product)
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const getAllProducts = async(req,res) =>{
  let sorter = req.query.sortBy;
  let orderBy = parseInt(req.query.orderBy)
  
  let product_list = await Product.find().sort({
      [sorter]: orderBy
  })

  res.send(product_list)
}
// Retrieve a products by their ID
const getUser = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new order
const addOrder = async(req, res) => {
  const { productId, customerId, quantity, price } = req.body;
  const newOrder = new Order({
    productId,
    customerId,
    quantity,
    status: 0, // 0 for pending
    price,
  });

  try {
    // returns the newly created order object
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Cancel a pending order
const removeOrder = async(req, res) => {
  try {
    // The ID of the order to cancel
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 0) {
      return res.status(400).json({ message: 'Cannot cancel a confirmed order' });
    }

    await order.remove();
    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const updateCart = async(req,res) =>{
  const flag = 
    {
        updatedOne : true
    }
    try
    {
        //update lname using fname
        await Cart.updateOne(
            { userId: req.body.userId },
            {$set: {cart: req.body.cart}}
        )

        flag.updatedOne = true;
    }catch (err)
    {
        console.log(err);
        flag.updatedOne = false;
    }
    res.send(flag)
}

const getCart = async(req,res) =>{

  try {
    const cart = await Cart.findOne({userId: req.params.id});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }


    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export { getProduct, getAllProducts, getUser, addOrder, removeOrder, updateCart, getCart };
//------------------------------