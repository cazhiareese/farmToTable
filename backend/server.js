import express from 'express';
import router from './router.js';   // import the router function
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the router
router(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
  });

app.listen(3001);