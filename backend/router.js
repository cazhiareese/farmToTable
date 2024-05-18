import express from 'express';
import authController from './controller/auth_controller.js';
import { getProduct, getAllProducts, getUser, addOrder, removeOrder, updateCart, getCart, getAllUser, getTransaction, getAllTransaction, getSalesReport } from './controller/user_controller.js'

const router = express.Router();

// CORS setup
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

// Auth routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

// Product routes
router.get('/products/:id', getProduct);
router.get('/products', getAllProducts);

// User routes
router.get('/users', getAllUser);

// Order routes
router.post('/orders', addOrder);
router.delete('/orders/:id', removeOrder);
router.get('/orders/:id', getTransaction);
router.get('/orders', getAllTransaction);

// Cart routes
router.put('/cart', updateCart);
router.get('/cart/:id', getCart);

// Sales report
router.get('/salesreport', getSalesReport);

export default router;