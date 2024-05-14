import express from 'express';
import { getProducts, getProductById, addOrder, removeOrder } from './controller/productController.js';
import { registerUser, loginUser } from './controller/auth.js'; // Import auth functions here

const router = express.Router();

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/orders', addOrder);
router.delete('/orders/:id', removeOrder);

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;