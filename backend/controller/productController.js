import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';

// getProduct by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// addOrder
export const addOrder = async (req, res) => {
  const { productId, customerId, quantity, price } = req.body;
  const newOrder = new Order({
    productId,
    customerId,
    quantity,
    status: 0, // 0 for pending
    price,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// removeOrder
export const removeOrder = async (req, res) => {
  try {
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
};