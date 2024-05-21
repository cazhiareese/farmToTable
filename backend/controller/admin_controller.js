import mongoose from 'mongoose';
import { User } from '../models/userSchema.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
// import {Cart} from '../models/cartSchema.js'

const getUser = async(req, res) => {
       try {
         const user = await User.findById(req.params.id);
         if (!user) {
           return res.status(404).json({ message: 'USer not found' });
         }
         res.json(user);
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
         const transactions = await Order.find({status: req.query.status});
         res.json(transactions);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };
     
     
    /*                   VERSION 1
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
         res.send(sales);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };
     */


////////////////////////////////////////////////////////////////////////

//            VERSION 2
const getSalesReport = async (req, res) => {
  try {
    const period = req.query.period || 'weekly';
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const allowedPeriods = ['weekly', 'monthly', 'annual', 'custom'];

    if (!allowedPeriods.includes(period)) {
      return res.status(400).json({ message: 'Invalid period specified' });
    }

    const { start, end } = getDateRange(period, startDate, endDate);

    const sales = await Order.find({
      status: 1,
      dateTime: { $gte: start, $lte: end },
    });

    const details = await getOrderDetails(sales);
    const flattenedDetails = details.flat();
    const productSalesMap = flattenedDetails.reduce((acc, product) => {
      if (acc[product.productId]) {
        acc[product.productId].totalQty += product.qty;
        acc[product.productId].totalSales += product.productSale;
      } else {
        acc[product.productId] = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          stock: product.stock,
          imageURL: product.imageURL,
          totalQty: product.qty,
          totalSales: product.productSale,
        };
      }
      return acc;
    }, {});

    const consolidatedDetails = Object.values(productSalesMap);

    res.json(consolidatedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

////////////////////////////////////////////////////////////////////////
  
    // TESTER ENDPOINTS
    const addProduct = async (req, res) => {
      try{
        const newProduct = new Product({
               name: req.body.name, 
               description: req.body.description,
               type: req.body.type,
               stock: req.body.stock,
               price: req.body.price, 
               imageURL: req.body.imageURL
        });
        
        //add product to database
        await newProduct.save();

        //send status
        res.status(201).send({details: "Product successfully added!"});
        }catch (error) {
                res.status(400).send({details: "Invalid credentials!"});
        }
      }

      const editStock = async (req, res) =>{       
        try{
          const filter = { _id: req.params.id };
          const update = { stock: req.body.stock };
        
          const result = await Product.findOneAndUpdate(filter, update, {new:true})
      
          res.send(result)
          if(!result) {
             res.status(404).send({order: "Product is not found !"})
          }
        }catch(err){
         res.status(500).send({error: err })
        }        
      }

    const removeProduct = async(req, res) => {
      try {
        // The ID of the order to cancel
        const deleteThis = await Product.findByIdAndDelete(req.params.id);
        if (!deleteThis) {
          return res.status(404).json({ message: 'Product not found' });
        }

        res.send(deleteThis);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }


   /* const salesReport = async (req, res) => {

    
      const period = req.query.period || 'weekly'; // Set a default value for period
      // const status = req.query.status
      const allowedPeriods = ['weekly', 'monthly', 'annual'];
      
      if (!allowedPeriods.includes(period)) {
        return res.status(400).json({ message: 'Invalid period specified' });
      }

      const now = new Date();
      let startDate;
      now.setHours(0,0,0,0); // set to 0:00
      switch (period) {
        case 'weekly':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'monthly':
          startDate = new Date(now);
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'annual':
          startDate = new Date(now);
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
      }

      const sales = await Order.find({status: 1, dateTime: {$gte: startDate}})

      async function getOrderDetails(sales) {
        const details = [];
        for (const order of sales) {
            const orderSpecs = [];   
            for (const added of order.productCheckedOut) {
                const body = await Product.findById(added.productId);
                orderSpecs.push({
                    productId: body._id,
                    name: body.name,
                    price: body.price,
                    stock: body.stock,
                    imageURL: body.imageURL,
                    qty: added.qty,
                    productSale: added.qty * body.price
                });
            }
    
            details.push(orderSpecs);
        } 
        return details;
      }


    
    const details = await getOrderDetails(sales);

    // const details = await Promise.all(sales.map(async (order) => {
    //   const orderSpecs = await Promise.all(order.productCheckedOut.map(async (added) => {
    //       const body = await Product.findById(added.productId);
    //       return {
    //         productId: body._id,
    //         name: body.name,
    //         price: body.price,
    //         stock: body.stock,
    //         imageURL: body.imageURL,
    //         qty: added.qty,
    //         productSale: added.qty * body.price
    //       };
    //   }));
    //   return orderSpecs;
    // }));

    const flattenedDetails = details.flat();
    const productSalesMap = {};
      flattenedDetails.forEach((product) => {
        if (productSalesMap[product.productId]) {
            productSalesMap[product.productId] = {
                ...productSalesMap[product.productId],
                totalQty: productSalesMap[product.productId].totalQty + product.qty,
                totalSales: productSalesMap[product.productId].totalSales + product.productSale
            };
        } else {
            productSalesMap[product.productId] = {
                productId: product.productId,
                name: product.name,
                price: product.price,
                stock: product.stock,
                imageURL: product.imageURL,
                totalQty: product.qty,
                totalSales: product.productSale
            };
        }
      });
      
      const consolidatedDetails = [...Object.values(productSalesMap)];

      res.json(consolidatedDetails)

    } */


    
//////////////////////REFACTORED///////////////////////////////////////////////////////

/*                           VERSION 1
// Helper function to get the start date based on the provided period parameter
const getStartDate = (period) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  switch (period) {
    case 'weekly':
      return new Date(now.setDate(now.getDate() - 7));
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() - 1));
    case 'annual':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      throw new Error('Invalid period specified');
  }
};

*/


// Helper function to get order details
const getOrderDetails = async (sales) => {
  const details = [];

  for (const order of sales) {
    const orderSpecs = [];

    for (const added of order.productCheckedOut) {
      const body = await Product.findById(added.productId);

      if (body) {
        orderSpecs.push({
          productId: body._id,
          name: body.name,
          price: body.price,
          stock: body.stock,
          imageURL: body.imageURL,
          qty: added.qty,
          productSale: added.qty * body.price,
        });
      }
    }

    details.push(orderSpecs);
  }

  return details;
};

//          VERSION 2
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
const getDateRange = (period, startDate, endDate) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let start, end;

  switch (period) {
    case 'custom':
      start = startDate ? new Date(startDate) : now;
      end = endDate ? new Date(endDate) : now;
      break;
    case 'weekly':
      start = new Date(now.setDate(now.getDate() - 7));
      end = now;
      break;
    case 'monthly':
      start = new Date(now.setMonth(now.getMonth() - 1));
      end = now;
      break;
    case 'annual':
      start = new Date(now.setFullYear(now.getFullYear() - 1));
      end = now;
      break;
    default:
      throw new Error('Invalid period specified');
  }

  return { start, end };
};


// New salesReport function
const salesReport = async (req, res) => {
  try {
    const period = req.query.period || 'weekly';
    const allowedPeriods = ['weekly', 'monthly', 'annual'];

    if (!allowedPeriods.includes(period)) {
      return res.status(400).json({ message: 'Invalid period specified' });
    }

    const startDate = getStartDate(period);

    const sales = await Order.find({ status: 1, dateTime: { $gte: startDate } });
    const details = await getOrderDetails(sales);
    const flattenedDetails = details.flat();
    const productSalesMap = flattenedDetails.reduce((acc, product) => {
      if (acc[product.productId]) {
        acc[product.productId].totalQty += product.qty;
        acc[product.productId].totalSales += product.productSale;
      } else {
        acc[product.productId] = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          stock: product.stock,
          imageURL: product.imageURL,
          totalQty: product.qty,
          totalSales: product.productSale,
        };
      }
      return acc;
    }, {});

    const consolidatedDetails = Object.values(productSalesMap);

    res.json(consolidatedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//////////////////////REFACTORED///////////////////////////////////////////////////////

    const countUsers = async(req, res) => {

      try{
      const count = await User.countDocuments({})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }



    const countOrders = async(req, res) => {

      try{
      const count = await Order.countDocuments({status: req.query.status})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }

    const countListings = async(req, res) => {

      try{
      const count = await Product.countDocuments({})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }
  

   
   export {getUser, getAllUser, getAllTransaction, getSalesReport, getTransaction, removeProduct, editStock, addProduct, salesReport, countUsers, countOrders, countListings}
