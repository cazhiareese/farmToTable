import { getProduct, getAllProducts, getUser, addOrder, removeOrder, updateCart, getCart } from './controller/user_controller.js'

const router = (app) =>{

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
      })
    app.get('/products', getAllProducts)
    app.post('/updateCart', updateCart)
    app.get('/getCart/:id', getCart)
    app.get('/getProduct/:id', getProduct)
}

export default router