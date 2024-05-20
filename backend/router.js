import{ getProduct, getAllProducts, addOrder, removeOrder, updateCart, getCart, getOrder, updateOrder }from './controller/user_controller.js'
import express from 'express';
import {getUser, getAllUser, getAllTransaction, getSalesReport, getTransaction, removeProduct, editStock, addProduct, salesReport, countListings, countOrders, countUsers} from './controller/admin_controller.js'
import {signUp, signIn} from './controller/auth_controller.js';
import { auth } from './util/auth.js';

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
  router.post('/sign-up', signUp);
  router.post('/sign-in', signIn);

  router.get('/customer/:id', auth, getUser);
  router.get('/all-customer', getAllUser);

  // Product routes
  router.get('/getProduct/:id', getProduct);
  router.get('/products', getAllProducts);
  router.post('/remove-product/:id', removeProduct);
  router.post('/edit-stock/:id', editStock);
  router.post('/add-product', addProduct)


  // Order routes
  router.delete('/orders/:id', removeOrder);
  router.get('/orders/:id', getTransaction);
  router.get('/orders', getAllTransaction);
  router.post('/addOrder', auth, addOrder);
  router.get('/getOrder/:id', getOrder);
  router.post('/updateOrder/:id', updateOrder);

  // Cart routes
  router.post('/updateCart', auth, updateCart);
  router.get('/getCart/:id', auth, getCart);

  // Sales report
  router.get('/salesreport',salesReport);

  router.get('/countOrder',countOrders);
  router.get('/countUsers',countUsers);
  router.get('/countListings',countListings);



 
export default router