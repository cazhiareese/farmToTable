import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
//temp
// await mongoose.connect( 'mongodb+srv://cazhia:E13UKHwTNcHF3PzJ@farm.kzqurki.mongodb.net/ftt?retryWrites=true&w=majority&appName=farm', {  
//  useNewUrlParser: true, useUnifiedTopology: true });

const SECRET_KEY = 'CMSC100FTT';

//sign up authentication
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
              await newUser.save();

              //send status
              res.status(201).send({details: "User successfully added!"});
       }catch (error) {
              res.status(400).send({details: "Invalid credentials!"});
       }
}

//sign in authentication
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

               //pass token
               const token = jwt.sign({id: user._id, type: user.type}, SECRET_KEY, {expiresIn: '1hr'});
               console.log(token)
               res.status(200).send(token);

       }catch (error) {
              res.status(401).send({details: "Invalid credentials!"});
       }
}

export { signUp, signIn };
