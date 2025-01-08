import express from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './routes/account.js';

const app = express();

// Use body-parser middleware here
app.use(bodyParser.json()); // Add this line to parse JSON requests

// Define routes
app.use('/account', accountRoutes);

// Start the server
app.listen(3001, () => {
  console.log('Account Service running on port 3001');
});
