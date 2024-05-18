// import express from 'express';
// import router from './router.js';   // import the router function
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
import router from './router.js';

const dbURI = 'mongodb+srv://lscombalicer2:C2ByZOUd72H1BNNN@farm.kzqurki.mongodb.net/ftt?retryWrites=true&w=majority&appName=farm';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to MongoDB & Initialize server
try {
       await mongoose.connect(dbURI);
       router(app);
       app.listen(3001, () => {console.log("Server started at port 3001.")});
} catch(error) {
       console.log("Server initialization error");
}


