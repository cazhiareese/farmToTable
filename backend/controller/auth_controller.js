/*
*
* Controller for handling user authentication, including sign-up and sign-in
*
*/

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import { Cart } from '../models/cartSchema.js';

const SECRET_KEY = 'CMSC100FTT';

// Register a new user and create an associated empty cart
const signUp = async (req, res) => {
       try{
              //hashed password & new user
              
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              const newUser = new User({
                     firstName: req.body.firstName,
                     middleName: req.body.middleName,
                     lastName: req.body.lastName,
                     type: "customer",
                     email: req.body.email,
                     password: hashedPassword
              });
              
              //add user to database
              const ret = await newUser.save({});
              console.log(ret)
              const newCart = new Cart({
                     userId: ret._id,
                     cart:[]
              })
             
              await newCart.save();

              //send status
              res.status(201).send({details: "User successfully added!"});
       }catch (error) {
              res.status(400).send({details: "Invalid credentials!"});
       }
}

// Sign in - Authenticate a user and provide a JWT token if credentials are valid
const signIn = async (req, res) => {
       try{
               const user = await User.findOne({ email: req.body.email });
               const currentPassword = await bcrypt.compare(req.body.password, user.password);

               //check if user exists
               if (!user) {
                     return res.status(401).send({ details: "Account does not exist!"});
               }
               //check if password is match
               if (!currentPassword) {
                     return res.status(401).send({details: "Mismatch password!"});
               }

               // JWT pass token
               const token = jwt.sign({id: user._id, type: user.type}, SECRET_KEY, {expiresIn: '1hr'});
               console.log(token)
               res.status(200).send(token);

       }catch (error) {
              res.status(401).send({details: "Invalid credentials!"});
       }
}

export { signUp, signIn };
