import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();  // Load environment variables first

const app = express();

// Port configuration
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());  // Parse JSON requests

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to BLACKND');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
