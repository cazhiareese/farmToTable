import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
import {Cart} from '../models/cartSchema.js'
await mongoose.connect( 'mongodb+srv://miles:LSHCMg8iTPP9E55H@farm.kzqurki.mongodb.net/ftt?retryWrites=true&w=majority&appName=farm', {  
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

// Retrieve all products
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

// Retrieve all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve a transaction by ID
const getTransaction = async (req, res) => {
  try {
    const transaction = await Order.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve all transactions
const getAllTransaction = async (req, res) => {
  try {
    const transactions = await Order.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate sales report based on the specified period
const getSalesReport = async (req, res) => {
  const period = req.query.period || 'weekly'; // Set a default value for period
  const allowedPeriods = ['weekly', 'monthly', 'annual'];

  if (!allowedPeriods.includes(period)) {
    return res.status(400).json({ message: 'Invalid period specified' });
  }

  try {
    const now = new Date();
    let startDate;

    // Calculate the start date based on the specified period
    switch (period) {
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'annual':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    // Aggregation
    const sales = await Order.aggregate([
      //  Filters the Order documents to include only those with a dateTime greater than or equal to the startDate.
      { $match: { dateTime: { $gte: startDate } } },

      // Groups the filtered orders by productId
      // totalSales - sum of the price field, total sales amount for the product
      // count - sum of the quantity field, total quantity sold for the product
      { $group: { _id: "$productId", totalSales: { $sum: "$price" }, count: { $sum: "$quantity" } } },

      // Left join with the Product collection
      // matched product details are stored in array field productDetails
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
      { $unwind: "$productDetails" },

      // Reshapes the output documents to include only the desired fields
      // Excludes the _id field from the final output
      // Includes productName from the productDetails 
      {
        $project: {
          _id: 0,
          productName: "$productDetails.name",
          totalSales: 1,
          totalQuantity: "$count"
        }
      }
    ]);

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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


// Update the cart with error handling
const updateCart = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.cart) {
      return res.status(400).json({ message: 'Missing userId or cart in request body' });
    }

    await Cart.updateOne({ userId: req.body.userId }, { $set: { cart: req.body.cart } });
    res.json({ updatedOne: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ updatedOne: false, message: err.message });
  }
};

// Retrieve the cart by user ID with error handling
const getCart = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Missing userId in request params' });
    }

    const cart = await Cart.findOne({ userId: req.params.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getProduct, getAllProducts, getUser, addOrder, removeOrder, updateCart, getCart, getAllUser, getTransaction, getAllTransaction, getSalesReport };
//------------------------------