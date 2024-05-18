import { getProduct, getAllProducts, getUser, addOrder, removeOrder, updateCart, getCart } from './controller/user_controller.js';
import {getUser, getAllUser, getAllTransaction, getSalesReport, getTransaction} from './controller/admin_controller.js'
import { signUp, signIn } from './controller/auth_controller.js';

const router = (app) =>{

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
      })

      // Auth routes
      router.post('/signup', signUp);
      router.post('/signin', signIn);

      // Product routes
      router.get('/getProduct/:id', getProduct);
      router.get('/products', getAllProducts);

      // Order routes
      router.delete('/orders/:id', removeOrder);
      router.get('/orders/:id', getTransaction);
      router.get('/orders', getAllTransaction);
      router.post('/addOrder', addOrder)
      router.get('/getOrder/:id', getOrder)
      router.post('/updateOrder/:id', updateOrder)

      // Cart routes
      router.post('/updateCart', updateCart);
      router.get('/getCart/:id', getCart);

      // Sales report
      router.get('/salesreport', getSalesReport);

      app.get('/products', getAllProducts)
      app.post('/updateCart', updateCart)
      app.get('/getCart/:id', getCart)
      app.get('/getProduct/:id', getProduct)
      app.post('/sign-up', signUp)
      app.post('/sign-in', signIn)

}

export default router