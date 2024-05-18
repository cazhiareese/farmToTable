import express from 'express';
import router from './router.js';   // import the router

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});