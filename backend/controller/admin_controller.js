/**
 * Controller for handling administrative actions such as user management, transaction retrieval, and sales reporting.
 * Includes functions to retrieve user data, transaction data, generate sales reports, and manage products.
 */

import mongoose from 'mongoose';
import moment from 'moment'
import { User } from '../models/userSchema.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
// import {Cart} from '../models/cartSchema.js'

// Retrieve a user by ID
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

  
    // TESTER ENDPOINTS
    const addProduct = async (req, res) => {

      let status = 0;
        if (req.body.stock > 0){
            status = 1
        }
      try{
        const newProduct = new Product({
               name: req.body.name, 
               description: req.body.description,
               type: req.body.type,
               stock: req.body.stock,
               price: req.body.price, 
               imageURL: req.body.imageURL,
               status: status
        });
        
        //add product to database
        await newProduct.save();

        //send status
        res.status(201).send({details: "Product successfully added!"});
        }catch (error) {
                res.status(400).send({details: "Invalid credentials!"});
        }
      }

      // Edit existing product
      const editProduct = async (req, res) =>{ 
        let status = 0;
        if (req.body.stock > 0){
            status = 1
        }
        try{
          const result = await Product.updateOne({_id: req.params.id},
             { $set:{
                  name: req.body.name,
                  stock: req.body.stock,
                  type: req.body.type,
                  price: req.body.price,
                  description: req.body.description,
                  imageURL: req.body.imageURL,
                  status: status
             }});
      
          res.send(result)
          if(!result) {
             res.status(404).send({order: "Product is not found !"})
          }
        }catch(err){
         res.status(500).send({error: err })
        }        
      }

      // Edit current stock
      const editStock = async (req, res) =>{      
        let status = 0;
        if (req.body.stock > 0){
            status = 1
        } 
        try{
          const result = await Product.updateOne({_id: req.params.id},
             { $set:{
  
                  stock: req.body.stock,
                  status: status
             }});
      
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



    // Generate sales report based on the specified period
    const salesReport = async (req, res) => {
      const period = req.query.period || 'weekly'; // Set a default value for period
      const allowedPeriods = ['weekly', 'monthly', 'annual'];
      
      if (!allowedPeriods.includes(period)) {
        return res.status(400).json({ message: 'Invalid period specified' });
      }

      // const now = new Date();
      let startDate;
      const now = moment().startOf('day');
      // now.setHours(0,0,0,0); // set to 0:00
      // switch (period) {
      //   case 'weekly':
      //     startDate = new Date(now);
      //     startDate.setDate(startDate.getDate() - 7);
      //     break;
      //   case 'monthly':
      //     startDate = new Date(now);
      //     startDate.setMonth(startDate.getMonth() - 1);
      //     break;
      //   case 'annual':
      //     startDate = new Date(now);
      //     startDate.setFullYear(startDate.getFullYear() - 1);
      //     break;
      // }

      switch (period) {
        case 'weekly':
          startDate = moment().startOf('week'); // Start of the current week
          break;
        case 'monthly':
          startDate = moment().startOf('month'); // Start of the current month
          break;
        case 'annual':
          startDate = moment().startOf('year'); // Start of the current year
          break;
      }

      //console.log(startDate)
      const sales = await Order.find({status: 1, dateTime: {$gte: startDate.toDate()}})

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

    }
// Count the total number of users
    const countUsers = async(req, res) => {

      try{
      const count = await User.countDocuments({})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }
// Count the total number of orders based on status
    const countOrders = async(req, res) => {

      try{
      const count = await Order.countDocuments({status: req.query.status})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }

// Count the total number of product listings
    const countListings = async(req, res) => {

      try{
      const count = await Product.countDocuments({})
      res.send({count})
      }catch(err){
        res.status(500).json({ message: err.message });
      }

    }

// Unlist a product by updating its status and stock
    const unlistProduct = async(req,res) => {
        try{
          const filter = { _id: req.params.id };
          const update = { status: req.body.status, stock: req.body.stock };
        
          const result = await Product.findOneAndUpdate(filter, update, {new:true})
      
          res.send(result)
          if(!result) {
             res.status(404).send({order: "Order is not found !"})
          }
        }catch(err){
         res.status(500).send({error: err })
        }
      }
    
  

   
   export {getUser, getAllUser, getAllTransaction, getSalesReport, getTransaction, removeProduct, editProduct, addProduct, salesReport, countUsers, countOrders, countListings, editStock, unlistProduct}