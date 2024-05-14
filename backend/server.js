import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router.js';

const app = express();
const dbURI = 'mongodb+srv://miles:LSHCMg8iTPP9E55H@farm.kzqurki.mongodb.net/farm';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

// Router middleware
app.use('/api', router);

// Connect to MongoDB & Initialize server
try {
  await mongoose.connect(dbURI);
  app.listen(3001, () => { console.log("Server started at port 3001.") });
} catch (error) {
  console.log("Server initialization error");
}