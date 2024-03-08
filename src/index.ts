import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import apiRouter from './routes/api';
import userRoutes from './routes/userRoutes';
import invoiceRoutes from './routes/invoiceRoutes';

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', apiRouter);
app.use('/users', userRoutes);
app.use('/invoices', invoiceRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
