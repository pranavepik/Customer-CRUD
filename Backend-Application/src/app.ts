import express from 'express';
import customerRoutes from './routes/customerRoutes';
import { Customer } from './models/customerModel';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use(errorMiddleware);

Customer.createTable().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});