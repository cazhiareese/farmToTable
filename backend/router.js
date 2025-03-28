/*
 * Router setup for handling various routes in the application.
 */ 

import{ getProduct, getAllProducts, addOrder, removeOrder, updateCart, getCart, getOrder, updateOrder }from './controller/user_controller.js'
import express from 'express';
import {getUser, getAllUser, getAllTransaction, editStock, getSalesReport, getTransaction, removeProduct, editProduct, addProduct, salesReport, countListings, countOrders, countUsers, unlistProduct} from './controller/admin_controller.js'
import {signUp, signIn} from './controller/auth_controller.js';
import { auth } from './util/auth.js';


  const router = express.Router();

  // CORS setup
  router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*', "http://localhost:3000/*",);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  });
  
  // Auth routes
  router.post('/sign-up', signUp);
  router.post('/sign-in', signIn);

  router.get('/customer/:id', getUser);
  router.get('/all-customer', getAllUser);
  router.get('/customer/:id', getUser);
  router.get('/all-customer', getAllUser);

  // Product routes
  router.get('/getProduct/:id', getProduct);
  router.get('/products', getAllProducts);
  router.post('/remove-product/:id', removeProduct);
  router.post('/edit-product/:id', editProduct);
  router.post('/add-product', addProduct)
  router.post('/edit-stock/:id', editStock)
  router.post('/unlist-product/:id', unlistProduct)


  // Order routes
  router.delete('/orders/:id', removeOrder);
  router.get('/orders/:id', getTransaction);
  router.get('/orders', getAllTransaction);
  router.post('/addOrder', auth, addOrder);
  router.get('/getOrder', auth, getOrder);
  router.post('/updateOrder/:id', updateOrder);
  router.post('/addOrder', auth, addOrder);
  router.get('/getOrder', auth, getOrder);
  router.post('/updateOrder/:id', updateOrder);

  // Cart routes
  router.post('/updateCart', auth, updateCart);
  router.get('/getCart', auth, getCart);
  router.post('/updateCart', auth, updateCart);
  router.get('/getCart', auth, getCart);

  // Sales report
  router.get('/salesreport',salesReport);

  router.get('/countOrder',countOrders);
  router.get('/countUsers',countUsers);
  router.get('/countListings',countListings);

export default router