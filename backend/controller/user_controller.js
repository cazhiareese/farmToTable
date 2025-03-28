/**
* Controller for handling product management and order processing.
* Provides functions to retrieve product information, manage orders, and update the user's shopping cart.
*/

import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
import { Cart } from '../models/cartSchema.js'
 
// Retrieve a products by their ID
const getProduct = async(req, res) => {
  const {id} = req.params;
  //console.log(id)
  try {
    const product = await Product.findById(id);
    if (!product) {
      
      return res.status(404).json({ message: 'Product not found' });
    }
    //console.log(product)
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Retrieve all products with sorting functionality
const getAllProducts = async (req, res) => {
  let sorter = req.query.sortBy;
  let orderBy = parseInt(req.query.orderBy);

  try {
    if (!sorter || !orderBy) {
      return res.status(400).json({ message: 'Missing sortBy or orderBy query parameters' });
    }

    const product_list = await Product.find().sort({ [sorter]: orderBy });
    res.send(product_list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
// add authorization
const addOrder = async(req, res) => {
  const { productCheckedOut, customerId, price } = req.body;
  const newOrder = new Order({
    productCheckedOut: req.body.productCheckedOut,
    customerId: req.user.id,
    status: 0, // 0 for pending
    price:req.body.price,
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


// Update the cart with error handling
// add authorization
const updateCart = async (req, res) => {
  try {
    if (!req.user.id|| !req.body.cart) {
      return res.status(400).json({ message: 'Missing userId or cart in request body' });
    }

    await Cart.updateOne({ userId: req.user.id }, { $set: { cart: req.body.cart } });
    res.json({ updatedOne: true });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ updatedOne: false, message: err.message });
  }
};

// Retrieve the cart by user ID with error handling
// add authorization
const getCart = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(400).json({ message: 'Missing userId in request params' });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/*

FROM THIS POINT ARE TESTERS PLEASE HANDLE ERRORS IF EVER OR INCORRECT SYNTAX
*/

// getOrder for current customer
const getOrder = async(req,res) =>{
  try {
    const orders = await Order.find({customerId: req.user.id, status: req.query.status });
    if (!orders) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// update order status
const updateOrder = async(req,res) =>{
  try{
    const filter = { _id: req.params.id };
    const update = { status: req.body.status };
  
    const result = await Order.findOneAndUpdate(filter, update, {new:true})

    res.send(result)
    if(!result) {
       res.status(404).send({order: "Order is not found !"})
    }
  }catch(err){
   res.status(500).send({error: err })
  }
}

export { getProduct, getAllProducts, addOrder, removeOrder, updateCart, getCart, getOrder, updateOrder };
//------------------------------