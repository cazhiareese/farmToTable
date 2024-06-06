/**
 * Server configuration file for running the application.
 * 
 * This file sets up the Express server, connects to the MongoDB database,
 * and initializes the necessary middleware and routes.
 */

// import express from 'express';
import router from './router.js';   // import the router function
// //Server configuration file
// //runs the application
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// router(app);

// app.listen(3001);
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://user2:lAhOqFgutMy0Gkmh@cluster0.wgvnhyn.mongodb.net/ftt2?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);
// Error handling middleware
app.use((err, req, res, next) => {
       console.error(err.stack);
       res.status(500).json({ message: 'Something went wrong' });
});

//Connect to MongoDB & Initialize server
try {
       await mongoose.connect(dbURI);
       app.listen(3001, () => {console.log("Server started at port 3001.")});
} catch(error) {
       console.log("Server initialization error");
}

